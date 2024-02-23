const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountTypeSchema = new Schema({
  typeName: {
    type: String,
  },
});

module.exports = mongoose.model('AccountType', AccountTypeSchema);
