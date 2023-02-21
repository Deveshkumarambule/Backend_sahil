const { UserModel } = require("../ticket_database");

exports.user_Inactive = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id.length);

    // if (id.length !== 24) {
    //   return res.json({
    //     status: false,
    //     message: "Please Provide Valid Id,Id should be 24 characters ",
    //   });
    // }

    const inactive_User = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(inactive_User, "--------------");

    if (!inactive_User || inactive_User == null || inactive_User == "null") {
      return res.json({
        status: false,
        message: "Please Provide Correct Id Data Not Found With This ID",
      });
    } else {
      return res.json({
        status: true,
        message: "User Successfully Inactivated",
        edited_Data: inactive_User,
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
