const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/authUtils");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//REGISTER USER
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    // cheak user
    const exgistingUser = await userModel.findOne({ email: email });
    //exgisting user cheak
    if (exgistingUser) {
      return res.status(200).send({
        success: false,
        message: "already exgist please login ",
      });
    }

    //register user
    //Hashing the required password
    const hashedPassword = await hashPassword(password); //hashing the password that we got form req.body

    //REGISTERING THE USER
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword, // changing the plain password with the hashed password
    }).save(); // saving after making new user

    //sending response after saving the newely created user
    res.status(201).send({
      success: true,
      message: "User Registered Successfully ",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration ",
      error,
    });
  }
};

//LOGIN USER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //cheaking if the user exist or not through email
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registered",
      });
    }
    // Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }
    //if matched we generate a token

    // Generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Send success response with token and user details
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login ",
      error,
    });
  }
};

//TEST CONTROLLER
const testController = (req, res) => {
  try {
    res.status(200).send("protected route");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerController, loginController, testController };
