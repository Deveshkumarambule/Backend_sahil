const express = require("express");
const mongoose = require("mongoose");
const { IssueModel, UserModel, CategoryModel } = require("../ticket_database");
const { path } = require("../ticket_database/models/user/user.schema");
exports.get_issue = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id, "========id====");
    let status = req.query.issue_status;
    // console.log(status);

    // build query
    // console.log("********" + req.query);
    const queryObj = { ...req.query };
    console.log(queryObj);
    // console.log("sahil");
    // console.log(queryObj.toLowercase);
    const excludeField = ["page", "sort", "limit", "field"];
    excludeField.forEach((ele) => {
      delete queryObj[ele];
    });

    const find_user_byid = await UserModel.findOne({ _id: id });
    console.log(find_user_byid, "=========find by id=============");

    if (!find_user_byid || find_user_byid == null || find_user_byid == "null") {
      return res.json({
        status: false,
        message: `Please Provide Valid Id, Data Not Found by this ${id} ID`,
      });
    } else {
      let cond = { assigned_to: id };
      if (status) cond["issue_status"] = { $exists: true, $eq: status };
      let query = IssueModel.find(cond)

        .populate({
          path: "assigned_to",
          model: UserModel,
          match: queryObj,
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

      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      }
      const get_issue = await query;
      console.log(get_issue, "=======issue======");
      let count = get_issue.length;
      if (!get_issue || get_issue == null || get_issue.length == 0) {
        return res.json({
          status: true,
          message: "No Issue Against You",
        });
      } else {
        return res.json({
          status: true,
          message: "Available Issue",
          Issue_count: count,
          Issue: get_issue,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Something Went Wrong Please Try Again",
    });
  }
};
