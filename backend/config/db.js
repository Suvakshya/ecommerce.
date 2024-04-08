const mongoose = require("mongoose");
const dotenv = require("dotenv");

//dotenv config
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("connection success ");
  } catch (error) {
    console.log(`error in ${error}`);
  }
};

module.exports = connectDB;
