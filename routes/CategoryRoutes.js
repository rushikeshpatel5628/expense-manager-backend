const router = require('express').Router();
const categoryController = require('../controllers/CategoryController');
router.get('/category', categoryController.getAllCategory);
router.post('/category', categoryController.addCategory);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;

