const nodemailer = require("nodemailer");

require("dotenv").config();
const { IssueRaised } = require("../lib/template/issue_raised_template");
const { IssueNumber } = require("../lib/template/IssueNumber_template");
let email = process.env.email;
console.log(email);
let pass = process.env.password;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // secure for 465, false for other
  auth: {
    user: email,
    pass: pass,
  },
});

module.exports = {
  sendIssueRaisedEmail: async (reciver, first_name, issue_number) => {
    console.log("------------" + issue_number);
    let sendingmail = true;
    try {
      await transporter.sendMail({
        from: email,
        to: reciver,
        subject: IssueNumber(issue_number),
        html: IssueRaised(first_name),
      });
    } catch (err) {
      sendingmail = false;
    }
    return sendingmail;
  },
};
