const express = require("express");
const mongoose = require("mongoose");
const { UserModel, IssueModel, CategoryModel } = require("../ticket_database");
// const { query } = require("../ticket_database/models/user/user.schema");
exports.get_raised_issuelist = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    let status = req.query.issue_status;
    // console.log(req.params);

    //build query
    const queryObj = { ...req.query };
    console.log(queryObj);

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
      let cond = { user_ID: id };
      if (status) cond["issue_status"] = { $exists: true, $eq: status };
      let query = IssueModel.find(cond)
        .populate({
          path: "assigned_to",
          model: UserModel,
          select: {
            _id: 1,
            first_name: 1,
            last_name: 1,
            mobile_number: 1,
            email: 1,
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
      const get_raised_issuelist = await query;

      console.log(get_raised_issuelist, "=======issue======");
      if (
        !get_raised_issuelist ||
        get_raised_issuelist == null ||
        get_raised_issuelist.length == 0
      ) {
        return res.json({
          status: true,
          message: "No Issue Created By You",
        });
      } else {
        let raised_Issue_count = get_raised_issuelist.length;
        return res.json({
          status: true,
          raised_Issue_count: raised_Issue_count,
          message: "Raise Issue",
          Issue: get_raised_issuelist,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      Message: " Something went wrong Please try again",
    });
  }
};
