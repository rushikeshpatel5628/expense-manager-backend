const UserCategorySchema = require("../models/UserCategoryModel");

const addCategory = async (req, res) => {
  // const userId = req.body.userId
  try {
    const category = await UserCategorySchema.create(req.body);
    res.status(201).json({
      flag: 1,
      message: "category added",
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

const getAllCategories = async (req, res) => {
  try {
    const category = await UserCategorySchema.find().populate('user');
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

const getAllCategoriesByUserId = async (req, res) => {
    userId = req.params.userId;
    if (!userId) return res.sendStatus(400);
    try {
      const category = await UserCategorySchema.find({user: userId}).populate('user');
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

const updateCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const updateCat = await UserCategorySchema.findByIdAndUpdate(id, req.body);
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
    const removedCat = await UserCategorySchema.findByIdAndDelete(id);
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
    getAllCategories,
    getAllCategoriesByUserId,
    addCategory, 
    updateCategory,
    deleteCategory,
}
