require("dotenv").config();
const express = require("express");
const app = express();

const morgon = require("morgan");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(morgon('[:date[iso]] :method :url :status :response-time ms - :status[status]'));

process.on("uncaughtException", (err) => {
  console.log("Shutting down server due to UnCaughtException");
  console.log(err.message);
  process.exit(1);
});

//  //! Connect DB...
const dbConnect = require("./db/dbConnect");
dbConnect();


app.get("/",(req,res)=>{
  return res.status(200).send("ok");
});

//  //! Music Routes...
const router = require("./routes/router");
app.use(router);
const { ownApiCallForRender } = require("./cronJob/ownApiCallForRender");
ownApiCallForRender();

const server = app.listen(8000, () => {
  console.log(`server running at http://127.0.0.1:8000`);
});

process.on("unhandledRejection", (err) => {
  console.log("Shutting down server due to UnHandledRejection");
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});

