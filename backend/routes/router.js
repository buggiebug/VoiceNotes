const routes = require("express").Router();
const multer = require("multer");
const upload = multer().single("music");

const { tokenVerify } = require("../middleware/authentication");

const { uploadMusic } = require("../controller/uploadMusic");
const { getAllMusic, getMusic } = require("../controller/getMusic");
const { deleteMusic } = require("../controller/deleteMusic");
const { updateMusicFavourate } = require("../controller/updateMusicFavourate");

routes.route("/api/upload").post(upload, tokenVerify, uploadMusic);
routes.route("/api/all-music").get(getAllMusic);
routes.route("/api/music/:id").get(getMusic);
routes.route("/api/music/:id").delete(tokenVerify,deleteMusic);
routes.route("/api/music/:id").put(updateMusicFavourate);

const { sigupUser, loginUser,getMusicIfUserLoggedIn } = require("../controller/userController");
routes.route("/api/signup").post(sigupUser);
routes.route("/api/login").post(loginUser);
routes.route("/api/me").get(tokenVerify,getMusicIfUserLoggedIn);

module.exports = routes;
