const mongoose = require('mongoose');

const GroupExpenseSchema = new mongoose.Schema({
  title: {
    type: String
  },
  amount: {
    type: Number,
    // required: true
  },
  description: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    // required: true
  },
  expDate: {
    type: Date,
    default: Date.now(),
  },
  paymentMethod: {
    type: String,
    default: 'cash',
  },
});

module.exports = mongoose.model('GroupExpense', GroupExpenseSchema);
