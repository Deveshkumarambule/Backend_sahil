const express = require("express");
const { hostIP } = require("../config/config");
const { verifytoken } = require("../middleware/authjwt");
const { adduservalidation } = require("../middleware/validation");
const { edituservalidation } = require("../middleware/validation");
const { userIdvalidation } = require("../middleware/validation");

const User_managementRouter = express.Router();

User_managementRouter.route("/adduser").post(
  // adduservalidation,
  require("../src/add.user").add_user
);

User_managementRouter.route("/alluserlist").get(
  require("../src/all.user.list").all_user_list
);

User_managementRouter.route("/getspecificuser/:id").get(
  // userIdvalidation,
  require("../src/get.specific.user").get_specific_user
);
User_managementRouter.route("/edituser/:id").patch(
  // userIdvalidation,
  edituservalidation,

  require("../src/edit.user").edit_User
);
User_managementRouter.route("/userInactive/:id").patch(
  userIdvalidation,
  require("../src/user.Inactive").user_Inactive
);

module.exports = User_managementRouter;
