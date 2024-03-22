const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupExpense',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Group', groupSchema);
