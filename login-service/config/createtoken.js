const jwt = require("jsonwebtoken");
require("dotenv").config();
let secretkey = process.env.secretkey;
module.exports = (data) => {
  return jwt.sign(data, secretkey, { expiresIn: "1h" });
};
