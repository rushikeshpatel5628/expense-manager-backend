const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayeeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  payeeName: {
    type: String,
  },
});

module.exports = mongoose.model("Payee", PayeeSchema);
