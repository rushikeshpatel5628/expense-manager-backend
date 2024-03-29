const GroupExpenseSchema = require("../models/GroupExpense");
const GroupSchema = require("../models/GroupModel");

const createGroupExpenses = async (req, res) => {
  try {
    // const groupId = req.params.groupid;
    // console.log("groupId....", groupId);

    let objectToSubmit = {
      title: req.body.title,
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
      paidBy: req.body.paidBy,
      group: req.body.group,
      expDate: req.body.expDate,
      paymentMethod: req.body.paymentMethod,
    }



    const newExpense = await GroupExpenseSchema.create(objectToSubmit);

    // Update the corresponding Group document to include the expense
    await GroupSchema.findByIdAndUpdate(req.body.group, {
      $push: { expenses: newExpense._id },
    });

    res.status(201).json({
      message: "Expense added",
      flag: 1,
      data: newExpense,
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
    const groups = await GroupExpenseSchema.find()
      .populate("paidBy")
      .populate("group")
      .populate("category");

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

// get group expenses by expense id
const getGroupexpenseById = async(req, res)=> {
  const expenseId = req.params.expenseid;
  try {
    const expense = await GroupExpenseSchema.findById(expenseId).populate("paidBy")
    .populate("group")
    .populate("category");

    res.status(200).json({
      message: "Expenses fetched",
      flag: 1,
      data: expense,
    });

  } catch (error) {
    console.log("error....", error)
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
}

// Get group expenses by group id
const getGroupExpensesByGroupId = async (req, res) => {
  const groupId = req.params.groupid;

  try {
    const groupExpense = await GroupExpenseSchema.find({ group: groupId })
      .populate("paidBy")
      .populate("group")
      .populate("category");
    if (!groupId) {
      return res.status(404).json({
        flag: -1,
        message: "Group id not found",
      });
    } else {
      // console.log(groupExpense)
      res.status(200).json({
        flag: 1,
        message: "Group expense with group id fetched",
        data: groupExpense
      });
    }
  } catch (error) {
    console.log("error....", error);
    res.status(500).json({
      flag: -1,
      message: "Internal server error",
    });
  }
};

// Update group expense by id
const updateGroupExpense = async(req, res)=> {
  const expenseId = req.params.id;

  let objectToSubmit = {
    title: req.body.title,
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
    paidBy: req.body.paidBy,
    group: req.body.group,
    // expDate: req.body.expDate,
    paymentMethod: req.body.paymentMethod,
  }

  try {
    const updateExpense = await GroupExpenseSchema.findByIdAndUpdate(
      expenseId,
      objectToSubmit
    );
    if (!updateExpense) {
      return res.status(404).json({
        message: "No expense with this ID was found.",
      });
    } else {
      res.status(201).json({
        flag: 1,
        message: "Updated expense!",
      });
    }
    
  } catch (error) {
    console.log("error", error)
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
}


// Delete group expense by id
const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;
  try {
    // Find the group expense by ID
    const expense = await GroupExpenseSchema.findById(expenseId);

    if (!expense) {
      // If expense with the given ID is not found, send a 404 Not Found response
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    // Remove the expense ID from the corresponding Group document
    await GroupSchema.findByIdAndUpdate(expense.group, {
      $pull: { expenses: expenseId },
    });

    // Delete the expense document from the database
    await GroupExpenseSchema.findByIdAndDelete(expenseId);

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    // If an error occurs during deletion, send a 500 Internal Server Error response
    console.error("Error deleting group expense:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllGroupExpenses,
  getGroupexpenseById,
  getGroupExpensesByGroupId,
  createGroupExpenses,
  updateGroupExpense,
  deleteExpense,
};
