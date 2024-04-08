const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");

// config env
dotenv.config();

//database config
db();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//route
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send();
});
//PORT
const PORT = process.env.PORT || 8080;

//run listern
app.listen(PORT, () =>
  console.log(`server running on ${process.env.DEV_MODE} on port ${PORT}`)
);
