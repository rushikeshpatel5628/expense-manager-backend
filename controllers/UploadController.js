const multer = require("multer");
const path = require("path");
const cloudinaryController = require("./CloudinaryController");
const UserSchema = require("../models/UserModel");

const getAllUser = async (req, res) => {
  const allUser = await UserSchema.find();
  res.status(200).json({
    message: "All user",
    data: allUser,  
  });
};

const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    // cb(null, Date.now() + "-" + file.originalname);
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fieldSize: 1000000000000 },
}).single("myImage");

const fileUpload = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: "Error in uploading file",
      });
    } else {
      if (req.file == undefined) {
        res.status(400).json({
          message: "No file selected",
        });
      } else {
        const result = await cloudinaryController.uploadImage(req.file.path);
        console.log(result);
        // console.log(req.body);
        const userObj = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          profilePicture: result.secure_url,
        };

        const savedUser = await UserSchema.create(userObj);

        res.status(200).json({
          message: "File uploaded",
          // file: `upload/${req.file.filename}`,
          data: savedUser
        });
      }
    }
  });
};

module.exports = {
  fileUpload,
  getAllUser,
};
