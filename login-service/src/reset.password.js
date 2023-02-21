const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../ticket_database");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const companySchema = require('../ticket_database/models/user/user.schema')

exports.reset_password = async (req, res) => {
  try {
    let tokenemail = req.body.token;
    console.log(tokenemail);
    let updatedpassword = req.body.password;
    // console.log(updatedpassword);
    let secretkey = process.env.secretkey;

    console.log(updatedpassword, "========req.pass========");

    if (!tokenemail || tokenemail == null || tokenemail == "") {
      return res.json({
        status: "false",
        Message: "Please Provide Emailtoken ",
      });
    }
    if (!updatedpassword || updatedpassword == null || updatedpassword == "") {
      return res.json({
        status: "false",
        Message: "Please Provide Updated Password",
      });
    }

    //decode the token

    let decodetokenemail;
    try {
      decodetokenemail = jwt.verify(tokenemail, secretkey);
      console.log(decodetokenemail);
    } catch (err) {
      return res.json({
        status: "false",
        Message: "Please Provide Valid token",
        error: err,
      });
    }

    //console.log(decodetokenemail.emailtoken)

    tokenemail = decodetokenemail.emailtoken;
    console.log(tokenemail, "====email====");

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(updatedpassword, salt, async (err, hash) => {
        const hashupdatedpassword = hash;
        const updpwd = await UserModel.updateOne(
          { email: tokenemail },
          {
            $set: { password: hashupdatedpassword },
          }
        );

        if (updpwd.modifiedCount == 1 && updpwd.matchedCount == 1) {
          return res.json({
            status: true,
            message: " Password Changed Successfully ",
          });
        } else {
          return res.json({
            status: false,
            message: "Unable To Change Password Please Provide Register Email",
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Something Went Wrong Please Try Again",
    });
  }
};
