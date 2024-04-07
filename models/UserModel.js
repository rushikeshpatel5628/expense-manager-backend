const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref:  "Role",
  },
  profilePicture: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", UserSchema);
