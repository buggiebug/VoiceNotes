const catchError = require("./catchAsyncError");
const JWT = require("jsonwebtoken");
const userModel = require("../model/userModel");

//  //!  Verify JWT Token...
module.exports.tokenVerify = catchError(async (req, res, next) => {
  const token = await req.header("user1token");
  if (!token) {
    return res.status(401).json({ success: false, message: "Please login to access this feature" });
  }
  const verifiedToken = await JWT.verify(token,process.env.SECRET_KEY);
  req.user = await userModel.findById(verifiedToken.id)
  next();
});
