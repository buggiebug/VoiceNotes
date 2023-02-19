const catchError = (myFun) => (req, res, next) => {
  Promise.resolve(myFun(req, res, next)).catch(next);
};

module.exports = catchError;


