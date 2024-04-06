const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  title: {
    type: String,
  },
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
    ref: "UserCategory1",
  },
  // subcategory: {
  //   type: Schema.Types.ObjectId,
  //   ref: "SubCategory",
  // },
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
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  goal: {
    type: Schema.Types.ObjectId,
    ref: "Goal"
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
