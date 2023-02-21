const express = require("express");
const { UserModel } = require("../ticket_database");
const tokenGenrator = require("../config/createtoken");
const { sendForgotPasswordEmail } = require("../service/sendEmail");
const { verifytoken } = require("../middleware/authjwt");

exports.forgot_password = async (req, res) => {
  try {
    let email = req.body.email;

    // if (!email || email == null || email == "") {
    //   return res.json({
    //     status: false,
    //     message: "Please Provide Email Details",
    //   });
    // }

    const olduser = await UserModel.findOne({ email });
    console.log(olduser);

    if (!olduser || olduser == null || olduser == "") {
      return res.json({
        status: false,
        message: "User Is Not Present ",
      });
    }
    const token = tokenGenrator({ emailtoken: olduser.email });

    console.log("token generated " + token);

    // const link = req.host+ ":4200/auth/reset-password?token="+token;
    const link = token;

    console.log("link " + link);

    const sendmail = await sendForgotPasswordEmail(olduser.email, link);
    console.log(sendmail, "===================");

    if (sendmail === true) {
      // verify header
      // var header = req.headers['authorization']
      // console.log(header,"======req.headers.=========")

      // var newheader = req.headers.authorization
      // console.log(newheader,"=====new authorization=========")

      return res.json({
        status: true,
        message: "Email Sent Successfully",
      });
    } else {
      return res.json({
        status: false,
        message: " Error in Sending Email",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Something Went Wrong Please Try Again",
    });
  }
};
