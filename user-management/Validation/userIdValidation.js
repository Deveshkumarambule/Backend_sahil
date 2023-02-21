const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);
const userIdValidationSchema = Joi.object({
  id: Joi.string().length(24).trim().required().messages({
    "string.base": " ID Should be a type of string",
    "string.empty": " ID Must contain a value",
    "string.trim": "no space allowed in  ID",
    // "any.required": " Please Check Your ID",
  }),
});
// const userIdValidationSchema = Joi.object({ id: Joi.objectId() });
module.exports = {
  userIdValidationSchema,
};
