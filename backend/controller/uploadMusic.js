const musicModel = require("../model/musicModel");
const catchAsyncError = require("../middleware/catchAsyncError");


const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

//  //! Upload Music...
exports.uploadMusic = catchAsyncError(async (req, res, next) => {
  const { originalname, mimetype, buffer, size } = req.file;
  if (!originalname || !buffer || !mimetype) {
    return res.status(400).json({ success: false, message: "No track found" });
  }

  const checkFileType = mimetype.match(/audio/gi);
  if (checkFileType === null) {
    return res.status(400).json({ success: false, message: "Please select Audio" });
  }

  const userId = String(req?.user?._id);

  await musicModel.create({
    user: userId,
    name: originalname,
    musicData: {
      data: buffer,
      contentType: mimetype,
    },
    size,
  });

  myCache.flushAll();

  const allMusics = await musicModel.find({ user: userId }).select("-musicData");
  return res
    .status(200)
    .json({ success: true, message: "Music Uploaded", allMusics });
});

