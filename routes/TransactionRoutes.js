const router = require('express').Router();
const transactionController = require('../controllers/TransactionController');
router.get('/transaction', transactionController.getAllTransaction);
router.get('/transaction/:id', transactionController.getTransactionById);
router.post('/transaction', transactionController.addTransaction);
router.put('/transaction/:id', transactionController.updateTransaction);
router.delete('/transaction/:id', transactionController.deleteTransaction);

module.exports = router;