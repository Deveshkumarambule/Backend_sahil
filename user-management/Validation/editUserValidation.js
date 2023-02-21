const Joi = require("joi");

const editUserValidationSchema = Joi.object({
  first_name: Joi.string().trim().messages({
    "string.base": "First_Name Should be a type of string",
    "string.empty": "First_Name Must contain a value",
    "string.trim": "No space allowed in First_Name",
    "any.required": "First_Name is a required field",
  }),
  last_name: Joi.string().trim().messages({
    "string.base": "Last_Name Should be a type of string",
    "string.empty": "Last_Name Must contain a value",
    "string.trim": "No space allowed in Last_Name",
    "any.required": "Last_Name is a required field",
  }),

  mobile_number: Joi.string()
    .trim()
    .min(10)
    .max(10)
    .pattern(new RegExp(/^[6-9]\d{9}$/))
    .label("mobile number")
    .messages({
      "string.base": "Mobile Number should be a type of string",
      "string.trim": "No space allowed",
      "string.pattern.base": "Mobile Number is Incorrect",
      "string.empty": "Mobile Number must contain value",
      "string.min": "Mobile Number must be 10 digit number",
      "string.max": "Mobile Number not allowed more than 10 digit number",
      "any.required": "Mobile number is a required field",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
    .messages({
      "string.empty": "Email not allowed to empty",
      "string.email": "Valid email required",
      "any.required": "Email is a required field",
    }),

  status: Joi.string().messages({
    "any.required": "Status is a required field",
    "string.empty": "Status Must contain a value",
  }),

  emp_id: Joi.string().trim().messages({
    "string.base": "Emp_Id should be a type of string",
    "string.trim": "no space allowed",
    "string.empty": "Emp_Id must contain value",
    "string.min": "Emp_Id must be 3 digit number",
    "string.max": "Emp_Id not allowed more than 3 digit number",
  }),
  role: Joi.string().default("User").valid("Admin", "User", "SuperAdmin"),
  // .required(),
});
module.exports = {
  editUserValidationSchema,
};
