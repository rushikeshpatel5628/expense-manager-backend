const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  goalName: {
    type: String,
  },
  maxamount: {
    type: Number,
  },
  startdate: {
    type: Date
  },
  enddate: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Goal", GoalSchema);
