const router = require('express').Router();
const groupExpController = require('../controllers/GrpExpController');
router.get('/groupexp', groupExpController.getAllGroupExpenses);
router.get('/groupexp/:expenseid', groupExpController.getGroupexpenseById);
router.get('/group/:groupid', groupExpController.getGroupExpensesByGroupId);
router.post('/addexpense', groupExpController.createGroupExpenses);
router.put('/update/:id', groupExpController.updateGroupExpense);
router.delete('/groupexp/:id', groupExpController.deleteExpense);


module.exports = router;