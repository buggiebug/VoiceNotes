const mongoose = require("mongoose");
const dbConnect = async() => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(`${process.env.MONGO_URL}music`)
    .then((e) => {
      console.log(`Database connected with ${e.connection.host}`);
    })
};

module.exports = dbConnect;
