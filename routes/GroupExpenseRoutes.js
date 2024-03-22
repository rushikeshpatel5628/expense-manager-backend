const router = require('express').Router();
const groupExpController = require('../controllers/GrpExpController');
router.get('/groupexp', groupExpController.getAllGroupExpenses);
router.post('/groupexp', groupExpController.createGroupExpenses);

module.exports = router;