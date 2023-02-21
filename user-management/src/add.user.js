const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../ticket_database");

exports.add_user = async (req, res) => {
  console.log("sahil");
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let mobile_number = req.body.mobile_number;
  let email = req.body.email;
  let password = req.body.password;
  let emp_id = req.body.emp_id;
  let role = req.body.role;

  const data = new UserModel({
    first_name: first_name,
    last_name: last_name,
    mobile_number: mobile_number,
    email: email,
    password: password,
    emp_id: emp_id,
    role: role,
  });
  console.log("-----+-" + data.fullName);

  // find existing user
  const unique_user = await UserModel.findOne({
    $or: [
      { email: data.email },
      { mobile_number: data.mobile_number },
      { emp_id: data.emp_id },
    ],
  });

  if (unique_user) {
    if (unique_user.email == data.email) {
      return res.json({
        status: false,
        message: "Email already exit ",
        errorCode: 401,
      });
    }
    if (unique_user.mobile_number == data.mobile_number) {
      return res.json({
        status: false,
        message: "Mobile Number already exit ",
        errorCode: 401,
      });
    }
    if (unique_user.emp_id == data.emp_id) {
      return res.json({
        status: false,
        message: "Employee Id already exit ",
        errorCode: 401,
      });
    }
  }

  //to save data

  const new_user = await data.save();

  // const new_user = await UserModel.insertOne({data});
  console.log(new_user, "============result=============");

  if (!new_user || new_user == null || new_user == "") {
    return res.json({
      status: false,
      message: "User Not Added ",
      errorCode: 401,
    });
  } else {
    return res.json({
      status: true,
      message: "User Added Successfully",
      user: new_user,
    });
  }
};
