const router = require('express').Router();
const accountController = require('../controllers/AccountController');
router.get('/account', accountController.getAllAccounts);
router.get('/account/:id', accountController.getAccountById);
router.post('/account', accountController.addAccount);
router.put('/account/:id', accountController.updateAccount);
router.delete('/account/:id', accountController.deleteAccount);

module.exports = router;

