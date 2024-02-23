const RoleSchema = require("../models/roleModel");

const getAllRoles = async (req, res) => {
  try {
    const role = await RoleSchema.find();
    res.status(200).json({
      message: "Roles fetched",
      flag: 1,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const addRole = async (req, res) => {
  try {
    const role = await RoleSchema.create(req.body);
    res.status(201).json({
      message: "Role added",
      flag: 1,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateRole = async (req, res) => {
  const id = req.params.id;
  try {
    const updateRole = await RoleSchema.findByIdAndUpdate(id, req.body);
    if (!updateRole) {
      return res.status(404).json({
        message: "No role with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Updated role!",
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

const deleteRole = async (req, res) => {
  const id = req.params.id;
  try {
    const removedRole = await RoleSchema.findByIdAndDelete(id);
    if (!removedRole) {
      return res
        .status(404)
        .json({ message: "No role with this ID was found." });
    } else {
      res.status(200).json({ message: "deleted role" });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
  getAllRoles,
  addRole,
  updateRole,
  deleteRole,
};
