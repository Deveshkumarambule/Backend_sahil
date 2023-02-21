const express = require("express");
const { hostIP } = require("../config/config");
//const { authjwt } = require('../middleware/authjwt')
const { verifytoken } = require("../middleware/authjwt");
const {
  userLoginValidation,
  userforgotPasswordValidation,
  userResetPasswordValidation,
  userLogoutValidation,
} = require("../middleware/loginValidation");

const loginRouter = express.Router();

loginRouter
  .route("/userlogin")
  .post(userLoginValidation, require("../src/user.login").user_login);

loginRouter
  .route("/forgotpassword")
  .post(
    userforgotPasswordValidation,
    require("../src/forgot.password").forgot_password
  );

loginRouter.route("/reset_password").post(
  // userResetPasswordValidation,
  require("../src/reset.password").reset_password
);

loginRouter
  .route("/userlogout")
  .post(userLogoutValidation, require("../src/user.logout").user_logout);

module.exports = loginRouter;
