const express = require("express");

const { IssueModel, UserModel, CategoryModel } = require("../ticket_database");

exports.get_specific_Issue_By_ID = async (req, res) => {
  try {
    let id = req.params.id;

    console.log(id.length);
    console.log("-----------" + id);

    if (id.length !== 24) {
      return res.json({
        status: false,
        message: "Please Provide Valid Id,Id should be 24 characters ",
      });
    }

    const specificIssue = await IssueModel.findOne({
      _id: id,
    })
      .populate({
        path: "assigned_to",
        model: UserModel,
        select: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          mobile_number: 1,
          email: 1,
          designation: 1,
          role: 1,
        },
      })
      .populate({
        path: "user_ID",
        model: UserModel,
        select: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          mobile_number: 1,
          email: 1,
          designation: 1,
          role: 1,
        },
      })
      .populate({
        path: "issue_type",
        model: CategoryModel,
        select: {
          _id: 1,
          category_name: 1,
        },
      });
    console.log(specificIssue, "--------------");

    if (!specificIssue || specificIssue == null || specificIssue == "null") {
      return res.json({
        status: false,
        message: "Please Provide Correct Id Data Not Found With This ID",
      });
    } else {
      return res.json({
        status: true,
        message: "Issue Found Successfully",
        user_data: specificIssue,
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
