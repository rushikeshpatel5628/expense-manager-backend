const mongoose = require("mongoose")

const UserCategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sharedCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SharedCategory'
    }
  });
  
module.exports = mongoose.model('UserCategory', UserCategorySchema);