const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  SubCategoryName: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
