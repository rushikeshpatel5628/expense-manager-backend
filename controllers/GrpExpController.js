const GroupExpenseSchema = require('../models/GroupExpense');

const createGroupExpenses = async (req, res) => {
    try {
      const group = await GroupExpenseSchema.create(req.body);
      res.status(201).json({
        message: "Expense added",
        flag: 1,
        data: group,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        flag: -1,
        data: error,
      });
    }
  };
  
  // Get all groups
  const getAllGroupExpenses = async (req, res) => {
    try {
      const groups = await GroupExpenseSchema.find();
  
      res.status(200).json({
        message: "Expenses fetched",
        flag: 1,
        data: groups,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        flag: -1,
        data: error,
      });
    }
  };
  

module.exports = {
    getAllGroupExpenses,
    createGroupExpenses
}