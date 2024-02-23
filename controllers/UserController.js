const UserSchema = require("../models/UserModel");

const getAllUsers = async (req, res) => {
  try {
    const user = await UserSchema.find().populate("role");
    res.status(200).json({
      message: "Users fetched",
      flag: 1,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserSchema.findById(id).populate("role");
    res.status(200).json({
      message: "User fetched",
      flag: 1,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const user = await UserSchema.create(req.body);
    res.status(201).json({
      message: "User added",
      flag: 1,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await UserSchema.findByIdAndUpdate(id, req.body);
    if (!updateUser) {
      return res.status(404).json({
        message: "No user with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Updated user!",
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

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const removedUser = await UserSchema.findByIdAndDelete(id);
    if (!removedUser) {
      return res
        .status(404)
        .json({ message: "No user with this ID was found." });
    } else {
      res.status(200).json({ message: "deleted user" });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}