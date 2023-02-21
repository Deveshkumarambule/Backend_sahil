const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const figlet = require("figlet");
const { hostIP, path, hostName, db_ip } = require("./config/config");
const issueRouter = require("./routes/issue.routes");
// const { getEmails } = require("./service/getEmail");

const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
// getEmails();
app.use("/issue", cors(), issueRouter);

const PORT = process.env.port || 7002;

const server = app.listen(PORT, () => {
  figlet("Issue Logging", async (err, data) => {
    if (err) {
      console.log("Something Went Wrong With figlet");
      console.dir(err);
      return;
    }
    console.log(data);
    console.log(`Running on Port: ${PORT} with process id: ${process.pid}`);
    console.log("HOST IP Address: ", hostIP);
    console.log("HOST Name: ", hostName);
    console.log("Host Path: ", path);
  });
});
