const Joi = require("joi");

const userLoginValidationSchema = Joi.object({
  email: Joi.string()
    .lowercase()
    .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.empty": "Email not allowed to empty",
      "string.email": "Valid Email required",
      "any.required": "Email is a required field",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    )
    .optional()
    .trim()
    .required()
    .min(5)
    .messages({
      "string.empty": "password Must contain a value",
      "string.required": "password required",
      "string.min": "Minimum 5 character required",
      "string.pattern.base": "follow correct method for password",
      "any.required": "password is a required field",
    }),
});
module.exports = {
  userLoginValidationSchema,
};
