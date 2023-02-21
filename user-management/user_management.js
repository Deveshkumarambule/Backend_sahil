const express = require("express");
const morgan = require("morgan");
// const compression = require("compression");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const { hostIP, path, hostName, db_ip } = require("./config/config");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const figlet = require("figlet");
const User_managementRouter = require("./routes/user.management.routes");

const app = express();
app.use(express.json());
// app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use("/user_management", cors(), User_managementRouter);

const port = process.env.port || 7001;
module.exports = app.listen(port, () => {
  figlet("User Management", async (err, data) => {
    if (err) {
      console.log("Something Went Wrong With figlet");
      console.dir(err);
      return;
    }
    console.log(data);
    console.log(`Running on Port: ${port} with process id: ${process.pid}`);
    console.log("HOST IP Address: ", hostIP);
    console.log("HOST Name: ", hostName);
    console.log("Host Path: ", path);
  });
});
// module.exports = server;
