const tool_database = require("./tool_database");

const CounterModel = tool_database.model(
  "counter",
  require("../../models/counter/counter_Schema")
);

module.exports = CounterModel;
