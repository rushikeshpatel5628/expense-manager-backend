const router = require('express').Router();
const groupExpController = require('../controllers/GrpExpController');
router.get('/groupexp', groupExpController.getAllGroupExpenses);
router.get('/groupexp/:groupid', groupExpController.getGroupExpensesByGroupId);
router.post('/groupexp', groupExpController.createGroupExpenses);
router.delete('/groupexp/:id', groupExpController.deleteExpense);


module.exports = router;