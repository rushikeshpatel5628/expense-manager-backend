const router = require('express').Router();
const userController = require('../controllers/UserCategoryController');
router.get('/category', userController.getAllCategories);
router.get('/category/user/:userId', userController.getAllCategoriesByUserId);
router.post('/category', userController.addCategory);
router.put('/category/:id', userController.updateCategory);
router.delete('/category/:id', userController.deleteCategory);

module.exports = router;