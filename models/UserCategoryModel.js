const mongoose = require("mongoose")

const UserCategorySchema = new mongoose.Schema({
    categoryName: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
});
  
module.exports = mongoose.model('UserCategory1', UserCategorySchema);