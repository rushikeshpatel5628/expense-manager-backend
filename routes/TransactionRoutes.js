const router = require('express').Router();
const transactionController = require('../controllers/TransactionController');
router.get('/transactions/:id', transactionController.getAllTransactions);
router.get('/transaction/:id', transactionController.getTransactionById);
router.get('/income', transactionController.getIncome);
router.get('/expense', transactionController.getExpense);
router.get('/goalexpense/:id', transactionController.getAllTransactionsByGoal);
router.post('/transaction', transactionController.addTransaction);
router.put('/transaction/:id', transactionController.updateTransaction);
router.delete('/transaction/:id', transactionController.deleteTransaction);

module.exports = router;