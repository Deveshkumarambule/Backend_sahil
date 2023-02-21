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
const loginRouter = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use("/login", cors(), loginRouter);
const PORT = process.env.port || 7000;
// app.get('/',(req,res)=>{
//      res.send("hello all")
//      console.log("=======welcome to ticketing tool ")
// })

// app.listen(port,()=>{
//     console.log(`welcome to login service ${port}`)
// })

const server = app.listen(PORT, () => {
  figlet("Login Service", async (err, data) => {
    if (err) {
      console.log("Somethig Went Wrong With figlet");
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
