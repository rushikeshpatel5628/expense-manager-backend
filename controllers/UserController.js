const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const UserSchema = require("../models/UserModel");
const encrypt = require("../utils/Encrypt");
const mailUtil = require("../utils/Mailer");
const OtpSchema = require("../models/OtpModel");

cloudinary.config({
  cloud_name: "dkwrhfiuw",
  api_key: "458297586322389",
  api_secret: "5Nr3M6QoyEOk9E5rPBoxKLWKoh0",
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Append current timestamp to ensure file uniqueness
  },
});

// File filter to restrict uploads to images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Initialize Multer with storage and file filter configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedData = req.body;
    // Exclude profilePicture field if no new picture uploaded
    if (!req.file) {
      delete updatedData.profilePicture;
    } else {
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Update profile picture URL in updatedData
      updatedData.profilePicture = result.secure_url;

      // Delete the file from local storage after uploading to Cloudinary
      // fs.unlinkSync(req.file.path);
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "No user found with this ID" });
    }
    res.status(200).json({
      flag: 1,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

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

// const updateUser = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const updateUser = await UserSchema.findByIdAndUpdate(id, req.body);
//     if (!updateUser) {
//       return res.status(404).json({
//         message: "No user with this ID was found.",
//       });
//     } else {
//       res.status(201).json({
//         message: "Updated user!",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       flag: -1,
//       data: error,
//     });
//   }
// };

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
      const flag = encrypt.comparePassword(password, userFromEmail.password);
      if (flag == true) {
        res.status(200).json({
          message: "User login successfully",
          flag: 1,
          data: userFromEmail,
        });
      } else {
        res.status(404).json({
          message: "User not found",
          flag: -1,
        });
      }
    } else {
      res.status(404).json({
        message: "User not found 22",
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

// const resetPassword = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const otp = req.body.otp;
//   const time = req.body.time;

//   console.log("email....", email);
//   console.log("password....", password);

//   const getUser = await OtpSchema.findOne({ email: email })

//   if (getUser) {
//     if (getUser.otp === otp) {
//       //gettime ffrom otp object....
//       //compsre for 30 seconds...
//       const timeDifference = time - getUser.time;
//       const is30SecondsGap = timeDifference >= 30000;
//       if (is30SecondsGap) {
//         res.status(401).json({
//           message: "otp is expired!!",
//           flag: -1,
//         });
//       } else {
//         const hashedPassword = encrypt.encryptPassword(password);

//         try {
//           const updateUser = await UserSchema.findOneAndUpdate(
//             { email: email },
//             { $set: { password: hashedPassword } }
//           );
//           //password rest...
//           //delete otp record....
//           await OtpSchema.findOneAndDelete({ email: email });

//           res.status(200).json({
//             message: "Password updated successfully",
//             flag: 1,
//           });
//         } catch (err) {
//           console.log(err);
//           res.status(500).json({
//             message: "Error in updating password",
//             flag: -1,
//           });
//         }
//       }
//     } else {
//       //delete otp record....
//       res.status(401).json({
//         message: "invalid otp..",
//         flag: -1,
//       });
//     }
//   } else {
//     //delete otp record....
//     res.status(500).json({
//       message: "error...",
//       flag: -1,
//     });
//   }
// };

const resetPassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const otp = req.body.otp;
  const time = req.body.time;

  console.log("email....", email);
  console.log("password....", password);
  console.log("otp....", otp);
  console.log("time....", time);

  const getUser = await OtpSchema.findOne({ email: email });

  console.log("getUser....", getUser);

  if (getUser) {
    if (getUser.otp === otp) {
      //gettime ffrom otp object....
      //compsre for 30 seconds...
      const timeDifference = time - getUser.time;
      console.log("timeDifference....", timeDifference);
      const is30SecondsGap = timeDifference >= 30000;
      console.log("is30SecondsGap....", is30SecondsGap);
      if (is30SecondsGap) {
        console.log("OTP is expired!!!");
        await OtpSchema.findOneAndDelete({ email: email });
        res.status(401).json({
          message: "otp is expired!!",
          flag: -1,
        });
      } else {
        const hashedPassword = encrypt.encryptPassword(password);

        try {
          const updateUser = await UserSchema.findOneAndUpdate(
            { email: email },
            { $set: { password: hashedPassword } }
          );
          console.log("Password updated successfully");
          //password rest...
          //delete otp record....
          await OtpSchema.findOneAndDelete({ email: email });

          res.status(200).json({
            message: "Password updated successfully",
            flag: 1,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            message: "Error in updating password",
            flag: -1,
          });
        }
      }
    } else {
      //delete otp record....
      await OtpSchema.findOneAndDelete({ email: email });
      console.log("Invalid OTP!!!");
      res.status(403).json({
        message: "Invalid otp..",
        flag: -1,
      });
    }
  } else {
    //delete otp record....
    console.log("Error in retrieving OTP from database!!!");
    res.status(500).json({
      message: "Error...",
      flag: -1,
    });
  }
};

const isUserExist = async (req, res) => {
  const email = req.body.email;

  try {
    const userbyemail = await UserSchema.findOne({ email: email });
    if (userbyemail) {
      //employee found
      //otp generation -->mail
      //time
      //otp save in db
      const otp = Math.floor(1000 + Math.random() * 9000);
      const mailRes = await mailUtil.mailSend(
        userbyemail.email,
        "OTP for reset password",
        "OTP for password generation",
        `Your OTP is ${otp}`
      );
      const otpObj = {
        otp: otp,
        email: userbyemail.email,
        status: true,
      };
      await OtpSchema.create(otpObj);
      console.log("otp....", otp);
      res.status(200).json({
        message: "User found",
        flag: 1,
        data: userbyemail,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in getting user by email",
    });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  isUserExist,
  resetPassword,
  upload,
};
