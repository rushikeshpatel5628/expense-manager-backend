const router = require('express').Router();
const payeeController = require('../controllers/PayeeController');
router.get('/payee', payeeController.getAllPayee);
router.get('/payees/:userId', payeeController.getPayeeByUserId);
router.post('/payee', payeeController.addPayee);
router.put('/payee/:id', payeeController.updatePayee);
router.delete('/payee/:id', payeeController.deletePayee);

module.exports = router;