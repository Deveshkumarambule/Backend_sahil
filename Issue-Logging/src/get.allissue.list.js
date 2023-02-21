const express = require("express");
const { UserModel, IssueModel, CategoryModel } = require("../ticket_database");
exports.get_allissue_list = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("id " + id);
    let status = req.query.issue_status;
    //build query
    const queryObj = { ...req.query };
    console.log(queryObj);
    console.log(req.query);
    // console.log(queryObj.toLowercase);
    const excludeField = ["page", "sort", "limit", "field"];
    excludeField.forEach((ele) => {
      delete queryObj[ele];
    });
    // console.log("*--------" + queryObj);
    // if (!id || id == null || id == "null" || id.length !== 24) {
    //   return res.json({
    //     status: false,
    //     message: "Please Provide Valid Id,Id should be 24 characters",
    //   });
    // }

    const find_user_byid = await UserModel.findOne({ _id: id });
    console.log(find_user_byid, "=========find by id=============");

    if (!find_user_byid || find_user_byid == null || find_user_byid == "null") {
      return res.json({
        status: false,
        message: `Please Provide Valid Id, Data Not Found by this ${id} ID`,
      });
    }

    if (find_user_byid.role == "Admin" || find_user_byid.role == "SuperAdmin") {
      // if (find_user_byid.role == "Admin") {
      //   const get_allissue_list = await IssueModel.find({
      //     assigned_to: { $ne: id },
      //   }).populate({
      //     path: "assigned_to",
      //     model: UserModel,
      //     select: {
      //       _id: 1,
      //       first_name: 1,
      //       last_name: 1,
      //       mobile_number: 1,
      //       email: 1,
      //       designation: 1,
      //       role: 1,
      //     },
      //   });
      //   let Issue_count = get_allissue_list.length;
      //   return res.json({
      //     status: true,
      //     message: "Only SuperAdmin Have That Access ",
      //     // issue_count: Issue_count,
      //     // Issue: get_allissue_list,
      //   });
      // } else

      let query = IssueModel.find(queryObj)
        // const get_issue_list = await IssueModel.find({
        //   issue_status: { $exists: true, $eq: status },
        // })
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
      //sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      }
      const get_issue_list = await query;
      console.log(get_issue_list);

      let Issue_count = get_issue_list.length;
      return res.json({
        status: true,
        message: "All Issue",
        issue_count: Issue_count,
        Issue: get_issue_list,
      });
    } else {
      return res.json({
        status: true,
        message: "You Do Not Have Access",
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
