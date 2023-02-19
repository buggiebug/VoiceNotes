const musicModel = require("../model/musicModel");
const catchAsyncError = require("../middleware/catchAsyncError");

//  //! Delete Music...
exports.deleteMusic = catchAsyncError(async (req, res, next) => {
  const singleMusic = await musicModel.findByIdAndDelete(req.params.id);
  if (!singleMusic) {
    return res
      .status(400)
      .json({ success: false, message: `Invalid Id: ${req.params.id}` });
  }
  const allMusic = await musicModel.find({user:singleMusic.user}).select("-musicData");
  return res.status(200).json({ success: true, message: "Music Deleted", allMusic });
});

