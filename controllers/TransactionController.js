const TransactionSchema = require("../models/TransactionModel");
const UserSchema = require("../models/UserModel");
const PayeeSchema = require("../models/PayeeModel");
const CategorySchema = require("../models/CategoryModel");
const GoalSchema = require("../models/GoalModel");
const UserCategorySchema = require("../models/UserCategoryModel");
// const SubCategorySchema = require("../models/SubCategoryModel");
const { mailSend } = require("../utils/Mailer");

const getAllTransactions = async (req, res) => {
  try {
    const userId = req.params.id;
    const transactions = await TransactionSchema.find({ user: userId })
      .populate("payee")
      .populate("category")
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
    

    const transactions = await TransactionSchema.find({ goal: goalId })
      .populate("payee")
      .populate("category")
      .populate("user")
      .populate("goal")
      .exec();

    if (transactions.length === 0) {
      return res.status(404).json({
        flag: -1,
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
    let objectToSubmit;
    console.log("Goal name....", req.body.goal);
    if (req.body.goal === undefined || req.body.goal === "") {
      // create a new object and assign it to objecttosubmit
      objectToSubmit = {
        title: req.body.title,
        amount: req.body.amount,
        expDateTime: req.body.expDateTime,
        payee: req.body.payee,
        category: req.body.category,
        paymentMethod: req.body.paymentMethod,
        status: req.body.status,
        description: req.body.description,
        transactionType: req.body.transactionType,
        user: req.body.user,
        
      };
    } else {
      objectToSubmit = {
        title: req.body.title,
        amount: req.body.amount,
        expDateTime: req.body.expDateTime,
        payee: req.body.payee,
        category: req.body.category,
        paymentMethod: req.body.paymentMethod,
        status: req.body.status,
        description: req.body.description,
        transactionType: req.body.transactionType,
        user: req.body.user,
        goal: req.body.goal
      };
    }

    const transaction = await TransactionSchema.create(objectToSubmit);

    // Payee
    const payeeId = req.body.payee;
    const payee = await PayeeSchema.findById(payeeId);
    const payeename = payee.payeeName;

    // category
    const catagoryId = req.body.category;
    const category = await UserCategorySchema.findById(catagoryId);
    const categoryname = category.categoryName;

    // subcategory
    // const subcategoryId = req.body.subcategory;
    // const subcategory = await SubCategorySchema.findById(subcategoryId);
    // const subcategoryname = subcategory.SubCategoryName;

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

     // Check if the goal's maximum amount is exceeded
     if (req.body.goal) {
      const goalId = req.body.goal;
      const goal = await GoalSchema.findById(goalId);
      const totalSpent = await TransactionSchema.aggregate([
        { $match: { goal: goalId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);
      const totalAmountSpent = totalSpent.length > 0 ? totalSpent[0].total : 0;

      if (totalAmountSpent > goal.maxamount) {
        // Send email to the user
        // const userEmail = userEmail; // Assuming user information is available in req.user
        const emailSubject = "Maximum Amount Exceeded";
        const emailText = `Dear User,\n\nYou have exceeded the maximum amount for the goal '${goal.goalName}'.`;
        const emailHtml = `
          <html>
            <body>
              <p>Dear User,</p>
              <p>You have exceeded the maximum amount for the goal '${goal.goalName}'.</p>
            </body>
          </html>
        `;
        await sendEmail(userEmail, emailSubject, emailText, emailHtml);
      }
    }

    res.status(201).json({
      message: "Transaction added",
      flag: 1,
      data: transaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
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
  let objectToSubmit;
  if (req.body.goal === undefined || req.body.goal === "") {
    objectToSubmit = {
      title: req.body.title,
      amount: req.body.amount,
      expDateTime: req.body.expDateTime,
      payee: req.body.payee,
      category: req.body.category,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status,
      description: req.body.description,
      transactionType: req.body.transactionType,
      user: req.body.user,
    };
  } else {
    objectToSubmit = {
      title: req.body.title,
      amount: req.body.amount,
      expDateTime: req.body.expDateTime,
      payee: req.body.payee,
      category: req.body.category,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status,
      description: req.body.description,
      transactionType: req.body.transactionType,
      user: req.body.user,
      goal: req.body.goal
    };
  }

  try {
    const updateTransaction = await TransactionSchema.findByIdAndUpdate(
      id,
      objectToSubmit
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
  getAllTransactions,
  getTransactionById,
  getAllTransactionsByGoal,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getIncome,
  getExpense,
};
