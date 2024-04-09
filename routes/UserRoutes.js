const router = require('express').Router();
const userController = require('../controllers/UserController');
const uploadController = require('../controllers/UploadController');

router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.addUser);
// router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/user/login', userController.loginUser);
router.post('/user/isuserexist', userController.isUserExist);
router.post('/user/resetpassword', userController.resetPassword);
// router.post('/fileUpload', uploadController.fileUpload);
router.put("/user/:id", userController.upload.single('profilePicture'), userController.updateUser)

module.exports = router;