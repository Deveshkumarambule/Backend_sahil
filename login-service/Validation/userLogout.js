const Joi = require("joi");

const userLogoutValidationSchema = Joi.object({
  id: Joi.string().length(24).trim().required().messages({
    "string.base": "ID Should Be A Type of String",
    "string.empty": "ID Must Contain a Value",
    "string.trim": "no Space Allowed In ID",
    "any.required": "ID Is A Required Field",
  }),
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
});
module.exports = {
  userLogoutValidationSchema,
};
