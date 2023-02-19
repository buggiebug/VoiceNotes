const musicModel = require("../model/musicModel");
const catchAsyncError = require("../middleware/catchAsyncError");

//  //! Update Favourate List of Music...
exports.updateMusicFavourate = catchAsyncError(async (req, res, next) => {
  const {boolValue} = req.body;
  const singleMusic = await musicModel.findByIdAndUpdate(req.params.id, {
    favourate: boolValue,
  }).select("-musicData");
  if (!singleMusic) {
    return res
      .status(400)
      .json({ success: false, message: `Invalid Id: ${req.params.id}` });
  }
  if(!req.user){
    const allMusic = await musicModel.find({user:singleMusic.user}).select("-musicData");
    return res.status(200).json({ success: true, message: "Favourate List Modified", allMusic });
  }else{
    const allMusic = await musicModel.find({}).select("-musicData");
    return res.status(200).json({ success: true, message: "Favourate List Modified", allMusic });
  }
});
