const express = require("express");
const { UserModel } = require("../ticket_database");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.user_login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    console.log(email, "============================= successful");

    // checking vallid email
    const findUser = await UserModel.findOne({
      $and: [{ email: email }, { status: "Active" }],
    });

    console.log(findUser, "finduser");

    if (!findUser) {
      return res.json({
        status: false,
        message: "User Is Inactive Or Please Provide Correct Email ",
      });
    }

    // console.log("user " + findUser);

    let user_details = {
      _id: findUser._id,
      first_name: findUser.first_name,
      last_name: findUser.last_name,
      email: findUser.email,
      emp_id: findUser.emp_id,
      role: findUser.role,
      // status: findUser.status,
    };

    if (findUser) {
      // checking password
      const comparepassword = bcrypt.compareSync(password, findUser.password);

      if (!comparepassword) {
        res.json({
          status: false,
          message: " Please Insert Correct Password",
        });
      } else {
        let privatekey = process.env.privatekey;
        let encdata = {
          email: findUser.email,
          role: findUser.role,
          emp_id: findUser.emp_id,
          // status: findUser.status,
        };
        console.log("***********");
        console.log(encdata);
        var token = await jwt.sign(encdata, privatekey, { expiresIn: "1d" });
        console.log(token, "================token================");
        res.json({
          status: true,
          message: "Login Successfully",
          token: token,
          user_details: user_details,
        });
      }
    } else {
      res.json({
        status: false,
        message: "Please provide Correct Email",
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
