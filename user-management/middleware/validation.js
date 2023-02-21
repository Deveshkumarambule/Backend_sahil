const { userValidationSchema } = require("../Validation/userValidation");
const {
  editUserValidationSchema,
} = require("../Validation/editUserValidation");
const { userIdValidationSchema } = require("../Validation/userIdValidation");
module.exports = {
  adduservalidation: async (req, res, next) => {
    const value = await userValidationSchema.validate(req.body, {
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
  edituservalidation: async (req, res, next) => {
    const value = await editUserValidationSchema.validate(req.body, {
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
  userIdvalidation: async (req, res, next) => {
    const value = await userIdValidationSchema.validate(req.body, {
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
