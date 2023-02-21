const nodemailer = require("nodemailer");
const { forgotPassword } = require("../lib/template/forgotpassword");
require("dotenv").config();
let email = process.env.email;
let pass = process.env.password;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // secure for 465, false for other
  auth: {
    user: email,
    pass: pass,
  },
});

module.exports = {
  sendForgotPasswordEmail: async (reciver, link) => {
    let sendingmail = true;
    try {
      await transporter.sendMail({
        from: email,
        to: reciver,
        subject: "Reset Password",
        html: forgotPassword(link),
      });
    } catch (err) {
      sendingmail = false;
    }

    return sendingmail;
  },
};
