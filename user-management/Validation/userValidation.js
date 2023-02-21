const Joi = require("joi");

const userValidationSchema = Joi.object({
  first_name: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .trim()
    .required()
    .messages({
      "string.base": "First_Name Should be a type of string",
      "string.empty": "First_Name Must contain a value",
      "string.trim": "no space allowed in First_Name",
      "string.pattern.base":
        "First_name Should Not Contain any Special Character and Number",
      "any.required": "First_Name is a required field",
    }),
  last_name: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+$/))
    .trim()
    .required()
    .messages({
      "string.base": "Last_Name Should be a type of string",
      "string.empty": "Last_Name Must contain a value",
      "string.trim": "No space allowed in Last_Name",
      "string.pattern.base":
        "Last_name Should Not Contain any Special Character and Number",
      "any.required": "Last_Name is a required field",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    )
    .optional()
    .trim()
    .required()
    .min(6)
    .messages({
      "string.empty": "password Must contain a value",
      "string.required": "password required",
      "string.min": "Minimum 6 character required",
      "string.pattern.base": "follow correct method for password",
      "any.required": "password is a required field",
    }),
  mobile_number: Joi.string()
    .trim()
    // .unique()
    .min(10)
    .max(10)
    .pattern(new RegExp(/^[6-9]\d{9}$/))
    .required()
    .label("mobile number")
    .messages({
      "string.base": "Mobile Number should be a type of string",
      "string.trim": "no space allowed",
      "string.pattern.base": "follow correct method of pattern",
      "string.empty": "Mobile Number must contain value",
      "string.min": "Mobile Number must be 10 digit number",
      "string.max": "Mobile Number not allowed more than 10 digit number",
      "any.required": "Mobile number is a required field",
    }),
  email: Joi.string()
    // .lowercase()
    .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.empty": "Email Not Allowed To Empty",
      "string.email": "Valid Email Required",
      "any.required": "Email Is A Required Field",
    }),

  status: Joi.string().default("Inactive").messages({
    "any.required": "Status is a required field",
    "string.empty": "status Must contain a value",
  }),
  role: Joi.string()
    .default("User")
    .valid("Admin", "User", "SuperAdmin")
    .required()
    .messages({
      "any.required": "Status is a required field",
      "string.empty": "status Must contain a value",
      "any.required": " Role is a required field",
    }),
  emp_id: Joi.string()
    // .regex(/[^a-zA-Z!@#$%^&*+]$/)
    // .allow("I")
    // .allow(new RegExp(/[0-9]+$/))
    .pattern(new RegExp(/[^a-zA-Z!@#$%^&*+-][^!@#$%^&*+][\d-]*$/))
    // .allow(new RegExp(/[I]$/))
    // .allow(new RegExp(/[0-9]$/))
    // .allow(new RegExp(/[-]$/))

    // .pattern(new RegExp(/[^a-zA-Z/]$/))

    .trim()
    // .max(5)
    .messages({
      "string.base": "Emp_Id Should Be A Type of String",
      "string.trim": "No Space Allowed",
      "string.empty": "Emp_Id Must Contain Value",
      "string.min": "Emp_Id Must be 3 Digit Number",
      "string.max": "Emp_Id Not Allowed More Than 3 Digit Number",
      "string.any": "Emp_Id Should Not Be Duplicate",
      "string.pattern.base": "Please Enter Proper Emp_Id  ",
    }),
});
module.exports = {
  userValidationSchema,
};
