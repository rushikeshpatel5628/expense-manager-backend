const mongoose = require("mongoose");
const GroupSchema = require("../models/GroupModel");
const UserSchema = require("../models/UserModel");
const { mailSend } = require("../utils/Mailer");

const createGroup = async (req, res) => {
  try {
    console.log("creator....", req.body.creator);
    const group = await GroupSchema.create({
      ...req.body,
      members: [ req.body.creator ],
    });
    
    res.status(201).json({
      message: "Group created",
      flag: 1,
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
    console.log("error....", error)
  }
};

// Get all groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await GroupSchema.find()
      .populate("expenses")
      .populate("members");

    res.status(200).json({
      message: "Groups fetched",
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

// Get all groups by user
const getAllGroupsByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const groups = await GroupSchema.find({  $or: [{ creator: userId }, { members: userId }], })
      .populate({
        path: "creator",
      })
      .populate("expenses")
      .populate("members").exec();

    res.status(200).json({
      message: "Groups fetched",
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

// Get Groups by groupId
const getGroupById = async (req, res) => {
  const groupId = req.params.groupid;
  try {
    const groups = await GroupSchema.findById(groupId)
      .populate("expenses")
      .populate("members").exec();

    res.status(200).json({
      message: "Group fetched",
      flag: 1,
      data: groups,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
    console.log("error....", error)
  }
};

// Invite a user to join a group
const inviteUserToJoinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { email } = req.body;
    console.log({ groupId });
    console.log({ email });

    // Fetch user ID by email
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Send invitation logic
    const userEmail = req.body.email;
    const emailSubject = "Join Group";
    const emailText = "Text";
    const emailHtml = `
    <p>Dear User,</p>
    <p>You have been invited to join a group. Click the link below to join:</p>
    <a href="YOUR_APP_URL/groups/${groupId}/join">Join Group</a>
    <p>Group ID: ${groupId}</p>
  `;
    mailSend(userEmail, emailSubject, emailText, emailHtml);
    res.status(200).json({flag: 1, message: `An invitation has been sent to ${userEmail}`});
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).json({ flag: -1, error: "Internal Server Error" });
  }
};

// Handle invitation
const handleInvitation = async (req, res) => {
  const userId  = req.params.userId;
  const groupId = req.body.groupId;
  try {
    // Add user to group members
    const group = await GroupSchema.findByIdAndUpdate(
      groupId,
      { $push: { members: userId } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ success: false, error: "Group not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Joined group successfully" });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Handle leaving group
const handleLeaveGroup = async (req, res) => {
  const { userId } = req.body;
  const { groupId } = req.params;
  
  try {
    // Remove user from group members
    const group = await GroupSchema.findByIdAndUpdate(
      groupId,
      { $pull: { members: userId } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ success: false, error: "Group not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Left group successfully" });
  } catch (error) {
    console.error("Error leaving group:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


module.exports = {
  getAllGroups,
  createGroup,
  inviteUserToJoinGroup,
  handleInvitation,
  handleLeaveGroup,
  getAllGroupsByUserId,
  getGroupById
};
