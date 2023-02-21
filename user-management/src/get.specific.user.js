const express = require("express");

const { UserModel } = require("../ticket_database");

exports.get_specific_user = async (req, res) => {
  try {
    let id = req.params.id;

    console.log(id.length);

    if (id.length !== 24) {
      return res.json({
        status: false,
        message: "Please Provide Valid Id,Id should be 24 characters",
      });
    }

    const specificUser = await UserModel.findOne(
      {
        _id: id,
      },
      {
        emp_id: 1,
        first_name: 1,
        last_name: 1,
        email: 1,
        mobile_number: 1,
        role: 1,
        status: 1,
      }
    );
    console.log(specificUser, "--------------");

    if (!specificUser || specificUser == null || specificUser == "null") {
      return res.json({
        status: false,
        message: "Please Provide Correct Id Data Not Found With This ID",
      });
    } else {
      return res.json({
        status: true,
        message: "User Found Successfully",
        user_data: specificUser,
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
