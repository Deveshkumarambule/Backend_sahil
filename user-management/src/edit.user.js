const { UserModel } = require("../ticket_database");
exports.edit_User = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id.length);

    // if (id.length !== 24) {
    //   return res.json({
    //     status: false,
    //     message: "Please Provide Valid Id,Id should be 24 characters ",
    //   });
    // }

    const edited_User = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(edited_User, "--------------");

    if (!edited_User || edited_User == null || edited_User == "null") {
      return res.json({
        status: false,
        message: "Please Provide Correct Id Data Not Found With This ID",
      });
    } else {
      return res.json({
        status: true,
        message: "User Edited Successfully",
        edited_Data: edited_User,
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
