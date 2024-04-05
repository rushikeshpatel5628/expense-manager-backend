const mongoose = require('mongoose');

const SharedCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('SharedCategory', SharedCategorySchema);


  