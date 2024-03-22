const GoalSchema = require("../models/GoalModel");
const TransactionSchema = require("../models/TransactionModel");

const getAllGoals = async (req, res) => {
  try {
    const goals = await GoalSchema.find();

    res.status(200).json({
      message: "Goals fetched",
      flag: 1,
      data: goals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getGoalById = async (req, res) => {
  const id = req.params.id;
  try {
    const goal = await GoalSchema.findById(id);
    if (!goal) {
      return res.status(404).json({
        message: "No goals with this ID was found.",
      });
    } else {
      res.status(200).json({
        message: "Goal fetched",
        flag: 1,
        data: goal,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getGoalByUserId = async(req, res) => {
  try {
    // const 
  } catch (error) {
    
  }
}

const addGoal = async (req, res) => {
  try {
    const goal = await GoalSchema.create(req.body);
    res.status(201).json({
      message: "Goal added",
      flag: 1,
      data: goal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const deleteGoal = async (req, res) => {
  const id = req.params.id;
  try {
    const TransactionInGoal = await TransactionSchema.deleteMany({ goal: id });
    const removedGoal = await GoalSchema.findByIdAndDelete(id);

    if (!removedGoal) {
      return res
        .status(404)
        .json({ message: "No transaction with this ID was found." });
    } else {
      res.status(200).json({ message: "deleted transaction" });
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: err,
    });
  }
};

const updateGoal = async (req, res) => {
  const id = req.params.id;
  try {
    const updateGoal = await GoalSchema.findByIdAndUpdate(id, req.body);
    if (!updateGoal) {
      return res.status(404).json({
        message: "No goal with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Updated goal!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

module.exports = {
  getAllGoals,
  getGoalById,
  addGoal,
  deleteGoal,
  updateGoal,
};
