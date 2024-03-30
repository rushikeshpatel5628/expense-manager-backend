const router = require("express").Router();
const groupController = require("../controllers/GroupController");
router.get("/groups", groupController.getAllGroups);
router.get("/groups/:id", groupController.getAllGroupsByUserId);
router.get("/group/:groupid", groupController.getGroupById);
router.post("/group", groupController.createGroup);
router.post("/groups/:groupId/invite", groupController.inviteUserToJoinGroup);
router.post("/join/:userId", groupController.handleInvitation);
router.post("/:groupId/leave", groupController.handleLeaveGroup);

module.exports = router;
