const Joi = require("joi");

const userResetPasswordValidationSchema = Joi.object({
  token: Joi.string()
    .trim()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required()
    .messages({
      "string.base": "Token Should Be A Type of String",
      "string.empty": "Token not allowed to empty",
      "string.pattern.base": "Valid Token required",
      "string.trim": "no Space Allowed In Token",
      "any.required": "Token is a required field",
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
      "string.empty": "Password Must Contain a Value",
      "string.required": "Password Is Required",
      "string.min": "Minimum 5 Character Required",
      "string.pattern.base": "Follow Correct Method For Password",
      "any.required": "Password Is a Required Field",
    }),
});
module.exports = {
  userResetPasswordValidationSchema,
};
