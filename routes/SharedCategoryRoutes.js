const router = require('express').Router();
const categoryController = require('../controllers/SharedCategoryController');
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.addCategory);
router.delete('/categories/:categoryId', categoryController.deleteCategory);

module.exports = router;