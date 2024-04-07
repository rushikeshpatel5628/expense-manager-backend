const router = require('express').Router();
const goalController = require('../controllers/GoalController');
router.get('/goal', goalController.getAllGoals);
router.get('/goal/:id', goalController.getGoalById);
router.get('/goals/:userId', goalController.getGoalByUserId);
router.post('/goal', goalController.addGoal);
router.put('/goal/:id', goalController.updateGoal);
router.delete('/goal/:id', goalController.deleteGoal);

module.exports = router;