const router = require('express').Router();
const categoryController = require('../controllers/SharedCategoryController');
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.addCategory);

module.exports = router;