const mongoose = require("mongoose");

const Schema = mongoose.Schema({
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
  }
});
