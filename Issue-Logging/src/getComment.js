const { IssueModel, UserModel } = require("../ticket_database");
// const mongoose = require("mongoose");
exports.get_comment = async (req, res) => {
  if (String(req.params.id) == "null" || String(req.params.id) == "undefined") {
    return res.json({
      message: "Comment not found",
      status: false,
      errorCode: 404,
    });
  }
  if (req.params.id) {
    const issue_details = await IssueModel.findById({
      _id: req.params.id,
    });
    if (issue_details == null) {
      return res.json({
        message: "Comment not found",
        status: false,
        errorCode: 404,
      });
    }
    console.log(issue_details + "issue details ***********");
    var x = JSON.parse(JSON.stringify(issue_details));

    const datar = x.comments;
    let datas = [];
    // let data = {};
    const allComment = await Promise.all(
      datar.map(async (element) => {
        console.log(element.user_id, "user_id----------------------------");
        console.log(element._id, "element_id----------------------------");
        console.log(
          element.createdAt,
          "element_createdAt----------------------------"
        );

        const user_details = await UserModel.findById({
          _id: element.user_id,
        });
        console.log(user_details + "userDetails******");

        return {
          user_Name: user_details.fullName,
          createdAt: element.createdAt,
          comment: element.comment,
        };
        // datas.push(data)
        // console.log(datas,'----------------dats--------------------')
      })
    );
    console.log(allComment);

    // console.log(datas, "datas-----------------");

    if (!issue_details) {
      return res.json({
        status: false,
        message: "Comment not found",
        errorCode: 404,
      });
    } else {
      return res.json({
        status: true,
        message: "Successfully get comment",
        data: allComment,
      });
    }
  }
};
