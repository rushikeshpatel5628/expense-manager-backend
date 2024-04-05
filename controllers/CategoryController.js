const CategorySchema = require('../models/CategoryModel');

const getAllCategory = async (req, res) => {
  try {
    const category = await CategorySchema.find();
    res.status(200).json({
      message: "Categories fetched",
      flag: 1,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const cat = await CategorySchema.create(req.body);
    res.status(201).json({
      message: "Category added",
      flag: 1,
      data: cat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const updateCat = await CategorySchema.findByIdAndUpdate(id, req.body);
    if (!updateCat) {
      return res.status(404).json({
        message: "No category with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Updated category!",
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

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const removedCat = await CategorySchema.findByIdAndDelete(id);
    if (!removedCat) {
      return res
        .status(404)
        .json({ message: "No category with this ID was found." });
    } else {
      res.status(200).json({ message: "deleted category" });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};




module.exports = {
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
