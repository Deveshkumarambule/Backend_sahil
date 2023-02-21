const Joi = require("joi");

const userforgotPasswordValidationSchema = Joi.object({
  email: Joi.string()
    .lowercase()
    .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.empty": "Email Not Allowed To Empty",
      "string.email": "Valid Email Required",
      "any.required": "Email is a Required Field",
    }),
});
module.exports = {
  userforgotPasswordValidationSchema,
};
