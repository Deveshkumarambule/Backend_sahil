const { IssueModel } = require("../ticket_database");
const mongoose = require("mongoose");

exports.addComment = async (req, res) => {
  // console.log("sahil");
  const user_id = req.body.user_id;
  console.log(user_id + "---------------//");
  const comment = req.body.comment;
  const issue_id = req.body.issue_id;
  console.log(issue_id);

  // if (user_id.length !== 24) {
  //   return res.json({
  //     status: false,
  //     message: "Please Provide Valid Id,Id should be 24 characters ",
  //   });
  // }

  // if (issue_id.length !== 24) {
  //   return res.json({
  //     status: false,
  //     message: "Please Provide Valid Id,Id should be 24 characters ",
  //   });
  // }
  console.log(comment + "********");
  let result = await IssueModel.updateOne(
    { _id: issue_id },
    {
      $push: {
        comments: [
          {
            user_id,
            comment,
          },
        ],
      },
    }
  );
  console.log(result);
  return res.json({ status: true, message: "Commment added sucessfully" });
};
