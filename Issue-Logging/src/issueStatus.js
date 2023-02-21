const { IssueModel } = require("../ticket_database");
const mongoose = require("mongoose");

exports.changeIssueStatus = async (req, res) => {
  try {
    const id = req.params.id;
    let new_issue_status = req.body.issue_status;
    console.log(id);
    console.log(id.length);

    const issue_Status_Of_User = await IssueModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { issue_status: new_issue_status } }
    );
    console.log(issue_Status_Of_User, "--------------");

    if (
      !issue_Status_Of_User ||
      issue_Status_Of_User == null ||
      issue_Status_Of_User == "null"
    ) {
      return res.json({
        status: false,
        message: "Please Provide Correct Id Data Not Found With This ID",
      });
    } else {
      return res.json({
        status: true,
        message: "Issue status changed Successfully",
        issue_status_Data: issue_Status_Of_User,
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
