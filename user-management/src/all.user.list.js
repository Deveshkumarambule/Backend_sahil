const express = require("express");
const { UserModel } = require("../ticket_database");

exports.all_user_list = async (req, res) => {
  try {
    //build query
    const queryObj = { ...req.query };
    console.log(queryObj);
    // console.log(queryObj.toLowercase);
    const excludeField = ["page", "sort", "limit", "field"];
    excludeField.forEach((ele) => {
      delete queryObj[ele];
    });
    if (queryObj.first_name) {
      queryObj.first_name = new RegExp(`^${queryObj.first_name}`, "i");
    }

    //execute query
    let query = UserModel.find(queryObj);

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    const userlist = await query;
    console.log(userlist, "======= All User List=============");

    if (
      !userlist ||
      userlist == null ||
      userlist == "" ||
      userlist.length == 0 ||
      userlist == "null"
    ) {
      return res.json({
        status: false,
        message: " User Not Found ",
        errorCode: 401,
      });
    } else {
      return res.json({
        status: true,
        message: "All User Details",
        userlist: userlist,
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
