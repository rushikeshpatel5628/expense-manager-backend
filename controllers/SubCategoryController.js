const SubCategorySchema = require('../models/SubCategoryModel');

const getAllSubCategory = async (req, res) => {
  try {
    const subcat = await SubCategorySchema.find().populate("category");
    res.status(200).json({
      message: "SubCategories fetched",
      flag: 1,
      data: subcat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const addSubCategory = async (req, res) => {
  try {
    const subcat = await SubCategorySchema.create(req.body);
    res.status(201).json({
      message: "SubCategory added",
      flag: 1,
      data: subcat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateSubCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const updateSubCat = await SubCategorySchema.findByIdAndUpdate(id, req.body);
    if (!updateSubCat) {
      return res.status(404).json({
        message: "No subcategory with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Updated subcategory!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const deleteSubCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const removedSubCat = await SubCategorySchema.findByIdAndDelete(id);
    if (!removedSubCat) {
      return res
        .status(404)
        .json({ message: "No subcategory with this ID was found." });
    } else {
      res.status(200).json({ message: "deleted subcategory" });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
  getAllSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
