const UserSchema = require("../models/UserModel");
const encrypt = require("../utils/Encrypt");

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
    const hashedPassword = encrypt.encryptPassword(req.body.password);
    const userObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    };
    const user = await UserSchema.create(userObj);
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

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userFromEmail = await UserSchema.findOne({ email: email });
    if (userFromEmail != null) {

      const flag = encrypt.comparePassword( password, userFromEmail.password );
      if (flag == true) {
        res.status(200).json({
          message: "User login successfully",
          flag: 1,
          data: userFromEmail,
        });
      } else{
        res.status(404).json({
          message: "User not found",
          flag: -1,
        });
      }


    }  else{
      res.status(404).json({
        message: "User not found",
        flag: -1,
      });
    }

  } catch (error) {
    res.status(500).json({
      message: "Error in login user",
      data: error,
      flag: -1,
    });



  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
};
