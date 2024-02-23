const TransactionSchema = require("../models/TransactionModel");

const getAllTransaction = async (req, res) => {
  try {
    const transaction = await TransactionSchema.find()
      .populate("payee")
      .populate("category")
      .populate("subcategory")
      .exec();
    res.status(200).json({
      message: "Transactions fetched",
      flag: 1,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getTransactionById = async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await TransactionSchema.findById(id)
      .populate("payee")
      .populate("category")
      .populate("subcategory")
      .exec();
    if (!transaction) {
      return res.status(404).json({
        message: "No transaction with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Transaction fetched",
        flag: 1,
        data: transaction,
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

const addTransaction = async (req, res) => {
  try {
    const transaction = await TransactionSchema.create(req.body);
    res.status(201).json({
      message: "Transaction added",
      flag: 1,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTransaction = await TransactionSchema.findByIdAndUpdate(
      id,
      req.body
    );
    if (!updateTransaction) {
      return res.status(404).json({
        message: "No transaction with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Updated transaction!",
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

const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const removedTransaction = await TransactionSchema.findByIdAndDelete(id);
    if (!removedTransaction) {
      return res
        .status(404)
        .json({ message: "No transaction with this ID was found." });
    } else {
      res.status(200).json({ message: "deleted transaction" });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
  getAllTransaction,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
