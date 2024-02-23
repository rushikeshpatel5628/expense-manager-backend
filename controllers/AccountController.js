const AccountSchema = require("../models/AccountModel");

// All accounts
const getAllAccounts = async (req, res) => {
  try {
    const account = await AccountSchema.find().populate("user");
    res.status(200).json({
      message: "Accounts fetched",
      flag: 1,
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

// Accounts by id
const getAccountById = async (req, res) => {
  const id = req.params.id;
  try {
    const account = await AccountSchema.findById(id).populate("user");
    res.status(200).json({
      message: "Account fetched",
      flag: 1,
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

// Create account
const addAccount = async (req, res) => {
  try {
    const account = await AccountSchema.create(req.body);
    res.status(201).json({
      message: "Account added",
      flag: 1,
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

// Update account
const updateAccount = async (req, res) => {
  const id = req.params.id;
  try {
    const updateAccount = await AccountSchema.findByIdAndUpdate(id, req.body);
    if (!updateAccount) {
      return res.status(404).json({
        message: "No account with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Updated Account!",
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

// Delete account by Id
const deleteAccount = async (req, res) => {
  const id = req.params.id;
  try{
    const removedAccount = await AccountSchema.findByIdAndDelete(id);
    if(!removedAccount){
      return res.status(404).json({message:'No account with this ID was found.'})
    }
    else{
      res.status(200).json({message:"deleted account"})
    }
  }
  catch(err){
    res.status(500).json({
      message: err
    })
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
  addAccount,
  updateAccount,
  deleteAccount
};
