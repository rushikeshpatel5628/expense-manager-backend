const TransactionSchema = require("../models/TransactionModel");
const UserSchema = require("../models/UserModel");
const PayeeSchema = require("../models/PayeeModel");
const CategorySchema = require("../models/CategoryModel");
const SubCategorySchema = require("../models/SubCategoryModel");
const { mailSend } = require("../utils/Mailer");

const getAllTransaction = async (req, res) => {
  try {
    // Extract userId from query parameter
    const userId = req.query.userId;

    // Fetch transactions for the specified user ID
    const transaction = await TransactionSchema.find({
      "payee.user._id": userId,
    })
      .populate("payee")
      .populate("category")
      .populate("subcategory")
      .populate("user")
      .populate("goal")
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

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionSchema.find()
      .populate("payee")
      .populate("category")
      .populate("subcategory")
      .populate("user")
      .populate("goal")
      .exec();
    res.status(200).json({
      message: "Transactions fetched",
      flag: 1,
      data: transactions,
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
      .populate("user")
      .populate("goal")
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

const getAllTransactionsByGoal = async (req, res) => {
  // Check for missing or invalid goal ID
  const goalId = req.params.id;
 

  try {
    // console.log("Query being executed:", { goal: { $oid: goalId } }); // Log the query for inspection

    const transactions = await TransactionSchema.find({ goal: goalId })
      .populate("payee")
      .populate("category")
      .populate("subcategory")
      .populate("user")
      .populate("goal")
      .exec();

    if (transactions.length === 0) {
      return res.status(404).json({
        message: "No transactions found for this goal ID.",
      });
    } else {
      res.status(200).json({
        message: "Transactions fetched",
        flag: 1,
        data: transactions,
      });
    }
  } catch (error) {
    console.error("Error:", error); // Log the error for detailed debugging
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

    // Payee
    const payeeId = req.body.payee;
    const payee = await PayeeSchema.findById(payeeId);
    const payeename = payee.payeeName;

    // category
    const catagoryId = req.body.category;
    const category = await CategorySchema.findById(catagoryId);
    const categoryname = category.categoryName;

    // subcategory
    const subcategoryId = req.body.subcategory;
    const subcategory = await SubCategorySchema.findById(subcategoryId);
    const subcategoryname = subcategory.SubCategoryName;

    //user
    const userId = req.body.user;
    const user = await UserSchema.findById(userId);
    const userEmail = user.email;
    const userName = user.firstName;

    const amount = req.body.amount;
    const expDateTime = req.body.expDateTime;
    const paymentMethod = req.body.paymentMethod;
    const status = req.body.status;
    const description = req.body.description;
    const transactionType = req.body.transactionType;
    const title = req.body.title;
    // console.log("payee", payeename);
    // console.log("category", categoryname);

    // Email configg
    const emailSubject = "New Expense Added";
    const emailText = `Dear User,\n\nYou have added a new expense with the following details:\n\n${JSON.stringify(
      req.body
    )}\n\nRegards,\nYour Application`;
    const emailHtml = `
    <html>
      <body>
        <p>Dear ${userName},</p>
        <p>You have added a new expense with the following details:</p>
        <table border="1" cellspacing="0" cellpadding="5">
          <tr>
            <td><strong>Payee:</strong></td>
            <td>${title}</td>
          </tr>
          <tr>
            <td><strong>Payee:</strong></td>
            <td>${payeename}</td>
          </tr>
          <tr>
            <td><strong>Category:</strong></td>
            <td>${categoryname}</td>
          </tr>
          <tr>
            <td><strong>Subcategory:</strong></td>
            <td>${subcategoryname}</td>
          </tr>
          <tr>
            <td><strong>Amount:</strong></td>
            <td>${amount}</td>
          </tr>
          <tr>
            <td><strong>Date:</strong></td>
            <td>${expDateTime}</td>
          </tr>
          <tr>
            <td><strong>Payment Method:</strong></td>
            <td>${paymentMethod}</td>
          </tr>
          <tr>
            <td><strong>Status:</strong></td>
            <td>${status}</td>
          </tr>
          <tr>
            <td><strong>Description:</strong></td>
            <td>${description}</td>
          </tr>
          <tr>
            <td><strong>Transaction Type:</strong></td>
            <td>${transactionType}</td>
          </tr>
        </table>
        <p>Regards,<br>Your Application</p>
      </body>
    </html>
    `;

    mailSend(userEmail, emailSubject, emailText, emailHtml);

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

const getExpense = async (req, res) => {
  try {
    const transactions = await TransactionSchema.find({
      transactionType: "expense",
    });

    let sum = 0;
    transactions.forEach((transaction) => {
      sum += transaction.amount;
    });

    res.status(200).json({
      message: "Total expense fetched",
      flag: 1,
      data: sum,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getIncome = async (req, res) => {
  try {
    const transactions = await TransactionSchema.find({
      transactionType: "income",
    });

    let sum = 0;
    transactions.forEach((transaction) => {
      sum += transaction.amount;
    });

    res.status(200).json({
      message: "Total income fetched",
      flag: 1,
      data: sum,
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
  getAllTransactions,
  getTransactionById,
  getAllTransactionsByGoal,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getIncome,
  getExpense,
};
