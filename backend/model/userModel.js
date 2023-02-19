const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: [true, "Email is required"],
  },
  password: {
    type: String,
    minLength: [5, "Password should be 5 char long"],
    require: [true, "Password is required"],
  },
  role: {
    type: String,
    default: "none",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", userSchema);
