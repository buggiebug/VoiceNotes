const musicModel = require("../model/musicModel");
const catchAsyncError = require("../middleware/catchAsyncError");

//  //! Get All Musics...
exports.getAllMusic = catchAsyncError(async (req, res, next) => {
  const data = await musicModel.find({}).select("-musicData");
  const allMusics = data.filter((e)=>{return e.user?undefined:e})
  const totalMusic = allMusics.length;
  return res
    .status(200)
    .json({ success: true, message: "All Musics", totalMusic,allMusics });
});


//  //! Get single Music...
exports.getMusic = catchAsyncError(async (req, res, next) => {
  const singleMusic = await musicModel.findById(req.params.id);
  if (!singleMusic) {
    return res
      .status(400)
      .json({ success: false, message: `Invalid Id: ${req.params.id}` });
  }
  return res
    .status(200)
    .json({ success: true, message: "Single Musics", singleMusic });
});



