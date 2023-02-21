const express = require("express");
const { IssueModel, UserModel, CounterModel } = require("../ticket_database");
const { sendIssueRaisedEmail } = require("../service/sendIssueEmail");
const { getEmails } = require("../service/getEmail");

// exports.new_issue = async (req, res) => {
//   try {
getOrAddUserIdByEmail = async (emailid) => {
  try {
    const findUser = await UserModel.findOne({ email: emailid });
    if (findUser) {
      console.log("User ID :: ", findUser._id);
      return findUser._id;
    } else {
      try {
        const data = new UserModel({
          email: emailid,
        });
        const new_user = await data.save();
        console.log(new_user + "-------new user");
        console.log(new_user, "============result=============");
        if (!new_user || new_user == null || new_user == "") {
          return res.json({
            status: false,
            message: "User Not Added ",
            errorCode: 401,
          });
        } else {
          return {
            status: true,
            message: "User Added Successfully",
            user: new_user,
          };
        }
      } catch (error) {
        console.log(error);
      }
      // return 0;
    }
  } catch (error) {
    console.log(error);
    // return 0;
  }
};

exports.new_issue = async (req, res) => {
  try {
    let counter = CounterModel.findOneAndUpdate(
      { id: "issue_number" },
      { $inc: { seq: 1 } },
      { new: true },
      async (err, cd) => {
        try {
          let seqId;
          if (cd == null) {
            const newVal = new CounterModel({ id: "issue_number", seq: 1 });
            newVal.save();
            seqId = 1;
            console.log("seqID if", seqId);
          } else {
            seqId = cd.seq;
            console.log("seqID else", seqId);
          }

          let assigned_to = req.body.assigned_to;
          let issue_number = seqId;
          let issue_title = req.body.issue_title;
          let issue_type = req.body.issue_type;
          let issue_summery = req.body.issue_summery;
          let user_ID = req.body.user_ID;
          let findUser = await UserModel.findOne({
            _id: user_ID,
          });

          let supportUser = await UserModel.findOne({
            _id: assigned_to,
          });
          if (!assigned_to) {
            supportUser = await UserModel.findOne({
              email: "avinash.jadhav@tech-trail.com",
            });
          }

          if (!findUser || !supportUser) {
            return res.json({
              status: false,
              message: `User Not Found, Please Provide Correct Details `,
            });
          } else {
            const data = new IssueModel({
              assigned_to: assigned_to || supportUser._id,
              issue_number: issue_number,
              issue_title: issue_title,
              issue_type: issue_type,
              issue_summery: issue_summery,
              user_ID: user_ID,
              updatedAt: Date.now(),
            });
            const result = await data.save();
            console.log("********* result" + result);
            console.log(supportUser.email);
            console.log(supportUser.first_name);
            console.log(result.issue_number);
            const SendIssueEmail = await sendIssueRaisedEmail(
              supportUser.email,
              supportUser.first_name,
              result.issue_number
            );
            console.log("*******" + SendIssueEmail);
            return res.json({
              status: true,
              message: `Issue Raised Successfully Against ${
                supportUser.fullName || supportUser.email
              } `,
            });
          }
          // }
        } catch (err) {
          console.log(err);
          return res.json({
            status: false,
            message: "Something Went Wrong Please Try Again",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Something Went Wrong Please Try Again",
    });
  }
};
/**
 * -- userId || email
 * find UserById --
 * check if userId is null or undefined
 * user obj; obj =
 * if userId not present
 *      -- find user by email
 *      -- if not found create user with email
 *
 * raise issue
 * new Issue
 */

/**
 *
 */
