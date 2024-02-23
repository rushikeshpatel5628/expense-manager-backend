const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencyTypeSchema = new Schema({
  currency: {
    type: String,
  },
});

module.exports = mongoose.model("CurrencyType", CurrencyTypeSchema);
