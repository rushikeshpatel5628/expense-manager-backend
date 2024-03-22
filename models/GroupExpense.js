const mongoose = require('mongoose');

const GroupExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    // required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
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
  }
});

module.exports = mongoose.model('GroupExpense', GroupExpenseSchema);
