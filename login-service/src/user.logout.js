const express = require("express");
const { UserModel } = require("../ticket_database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.user_logout = async (req, res) => {
  try {
    let id = req.body.id;
    console.log(id);
    let token = req.body.token;

    // if (!id || id == null || id == "") {
    //   return res.json({
    //     status: false,
    //     message: "Please provide id",
    //   });
    // }

    console.log(token);

    // if (!token || token == null || token == "") {
    //   return res.json({
    //     status: false,
    //     message: "Please provide token",
    //   });
    // }

    const findUser = await UserModel.findOne({ _id: id });
    console.log(findUser);

    if (findUser) {
      let data = {
        token: req.body.token,
      };
      const exptoken = jwt.sign(data, process.env.exptokenkey, {
        expiresIn: "1s",
      });
      console.log(exptoken);

      if (exptoken) {
        res.json({
          status: true,
          message: "You have been Logged Out Successfully",
        });
      }
    } else {
      res.json({
        status: false,
        message: "Unable to Logout",
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
