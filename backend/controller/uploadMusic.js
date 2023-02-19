const musicModel = require("../model/musicModel");
const catchAsyncError = require("../middleware/catchAsyncError");

//  //! Upload Music...
exports.uploadMusic = catchAsyncError(async (req, res, next) => {
  const { originalname, mimetype, buffer, size } = req.file;
  if (!originalname || !buffer || !mimetype) {
    return res.status(400).json({ success: false, message: "No track found" });
  }

  const checkFileType = mimetype.match(/audio/gi);
  if(checkFileType===null){
    return res.status(400).json({ success: false, message: "Please select Audio" });
  }

  await musicModel.create({
    user: req.user._id,
    name: originalname,
    musicData: {
      data: buffer,
      contentType: mimetype,
    },
    size,
  });

  const allMusics = await musicModel.find({user:req.user.id}).select("-musicData");
  return res
    .status(200)
    .json({ success: true, message: "Music Uploaded", allMusics });
});

