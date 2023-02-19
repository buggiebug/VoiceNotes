const mongoose = require("mongoose");
const musicSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  musicData: {
    data: Buffer,
    contentType: String,
  },
  favourate: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("music", musicSchema);
