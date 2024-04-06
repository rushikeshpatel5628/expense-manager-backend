const SharedCategorySchema = require("../models/SharedCategory");
const UserCategorySchema = require("../models/UserCategorySchema");

const getAllCategories = async(req, res)=> {
    try {
        // Predefined categories
        const predefinedCategories = ['Food', 'Transportation', 'Medical'];
    
        // Insert predefined categories if they don't exist
        await Promise.all(predefinedCategories.map(async category => {
          await SharedCategorySchema.findOneAndUpdate({ name: category }, { name: category }, { upsert: true });
        }));
    
        // Retrieve user-specific categories
        const userCategories = await UserCategorySchema.find({ userId: req.query.userId }).populate("sharedCategory").populate("userId");
    
        // Retrieve all categories (predefined and user-specific)
        const categories = await SharedCategorySchema.find().lean();
        userCategories.forEach(category => categories.push(category));
    
        res.status(200).json({
            flag: 1, 
            message: "Categories fetched",
            data: categories,
            // data: categories.map(category => category.name)
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ flag: -1, error: 'Internal server error' });
      }
}


const addCategory = async (req, res)=> {
    const { userId, name } = req.body;
  if (!userId || !name) {
    return res.status(400).json({flag: -1,  error: 'User ID and name are required' });
  }

  try {
    const existingCategory = await UserCategorySchema.findOne({ name, userId });
    if (existingCategory) {
      return res.status(400).json({flag: -1,  error: 'Category already exists for this user' });
    }

    const newCategory = new UserCategorySchema({ name, userId });
    await newCategory.save();
    res.status(201).json({flag: 1, message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({flag: -1, error: 'Internal server error' });
  }
}

const deleteCategory = async(req, res)=> {
  const categoryId = req.params.categoryId;
  const userId = req.body.userId;

  try {
    // Check if the category belongs to the user
    const category = await UserCategorySchema.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ error: 'Category not found or does not belong to the user' });
    }

    // Delete the user-specific category
    await UserCategorySchema.findByIdAndDelete(categoryId);

    // Check if the shared category is not used by other users
    // const sharedCategoryUsed = await UserCategorySchema.exists({ sharedCategory: category.sharedCategory });
    // if (!sharedCategoryUsed) {
    //   // Delete the shared category if not used by other users
    //   await SharedCategorySchema.findByIdAndDelete(category.sharedCategory);
    // }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory,
}