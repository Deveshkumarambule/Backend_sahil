const tool_database = require("./tool_database");

const IssueModel = tool_database.model(
  "issue",
  require("../../models/issue/issue.schema")
);

console.log(IssueModel);

module.exports = IssueModel;
