const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  amount: {
    type: Number,
  },
  expDateTime: {
    type: Date,
  },
  payee: {
    type: Schema.Types.ObjectId,
    ref: "Payee",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  paymentMethod: {
    type: String,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
  },
  transactionType: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
