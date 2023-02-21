const { userLoginValidationSchema } = require("../Validation/user.login");

const {
  userforgotPasswordValidationSchema,
} = require("../Validation/forgotPassword");
const {
  userResetPasswordValidationSchema,
} = require("../Validation/resetPassword");
const { userLogoutValidationSchema } = require("../Validation/userLogout");
module.exports = {
  userLoginValidation: async (req, res, next) => {
    const value = await userLoginValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    // console.log(value);

    if (value.error) {
      res.json({
        // success: 0,
        message: value.error.details[0].message,
        //error: resp,
      });
    } else {
      next();
    }
  },
  userforgotPasswordValidation: async (req, res, next) => {
    const value = await userforgotPasswordValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    // console.log(value);

    if (value.error) {
      res.json({
        // success: 0,
        message: value.error.details[0].message,
        //error: resp,
      });
    } else {
      next();
    }
  },
  userResetPasswordValidation: async (req, res, next) => {
    const value = await userResetPasswordValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    // console.log(value);

    if (value.error) {
      res.json({
        // success: 0,
        message: value.error.details[0].message,
        //error: resp,
      });
    } else {
      next();
    }
  },
  userLogoutValidation: async (req, res, next) => {
    const value = await userLogoutValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    // console.log(value);

    if (value.error) {
      res.json({
        // success: 0,
        message: value.error.details[0].message,
        //error: resp,
      });
    } else {
      next();
    }
  },
};
