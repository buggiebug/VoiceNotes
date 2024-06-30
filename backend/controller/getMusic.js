const musicModel = require("../model/musicModel");
const catchAsyncError = require("../middleware/catchAsyncError");

const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

//  //! Get All Musics...
exports.getAllMusic = catchAsyncError(async (req, res, next) => {
  const isMusic = await myCache.get("music");
  if (isMusic) {
    return res
      .status(200)
      .json({ success: true, message: "All Musics", totalMusic: isMusic?.length, allMusics: isMusic });
  } else {
    const data = await musicModel.find({}).select("-musicData");
    const allMusics = data.filter((e) => { return e.user ? undefined : e })
    const totalMusic = allMusics.length;

    myCache.set("music", allMusics);
    return res
      .status(200)
      .json({ success: true, message: "All Musics", totalMusic, allMusics });
  }
});


//  //! Get single Music...
exports.getMusic = catchAsyncError(async (req, res, next) => {
  const singleMusic = await musicModel.findById(req?.params?.id);
  return res
    .status(200)
    .json({ success: true, message: "Single Musics", singleMusic });
});



