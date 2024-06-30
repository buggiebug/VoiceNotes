const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../model/userModel");
const musicModel = require("../model/musicModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const NodeCache = require("node-cache")
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

//  //! Signup User...
exports.sigupUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(401)
      .json({ success: false, message: `Fields are required` });
  }
  const isUserExit = await userModel.findOne({ email: email });
  if (isUserExit) {
    return res
      .status(401)
      .json({ success: false, message: `${email} Already is used` });
  }

  //  //* Encrypt the password...
  const hashPass = await bcrypt.hash(String(password), 10);

  const newUser = await userModel.create({
    name,
    email,
    password: hashPass,
    role: "user",
  });
  //  JWT Token...
  const jwtToken = await JWT.sign({ id: newUser._id }, process.env.SECRET_KEY);
  const musicData = await musicModel
    .find({ user: newUser._id })
    .select("-musicData");
  return res
    .status(200)
    .json({
      success: true,
      message: "Account Created",
      jwtToken,
      newUser,
      musicData,
    });
});

//  //! Login User...
exports.loginUser = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ success: false, message: `Fields are required` });
  }
  const isUserExit = await userModel.findOne({ email: email });
  if (!isUserExit) {
    return res
      .status(401)
      .json({ success: false, message: `${email} not found` });
  }

  // //*  Compare Password with Hashed Password...
  const userPass = await bcrypt.compare(String(password), isUserExit.password);
  if (!userPass) {
    return res
      .status(401)
      .json({ success: false, message: `Invalid password` });
  }

  //  JWT Token...
  const jwtToken = await JWT.sign(
    { id: isUserExit._id },
    process.env.SECRET_KEY
  );

  const musicData = await musicModel
    .find({ user: isUserExit._id })
    .select("-musicData");
  return res
    .status(200)
    .json({
      success: true,
      message: "Logged In",
      jwtToken,
      isUserExit,
      musicData,
    });
});

//  //! Get music if user already logged in...
exports.getMusicIfUserLoggedIn = catchAsyncError(async (req, res) => {
  const userData = req.user.name;
  const userId = String(req?.user?._id);
  const isMusic = await myCache.get(userId);
  if (isMusic) {
    return res.status(200).json({ success: true, message: "My Musics", userData, musicData: isMusic });
  } else {
    const musicData = await musicModel
      .find({ user: req.user._id })
      .select("-musicData");

    myCache.set(userId, musicData);
    return res.status(200).json({ success: true, message: "My Musics", userData, musicData });
  }
});

