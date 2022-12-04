const express = require("express");
const router = express.Router();
const { getAllUser, signup, login } = require("../controllers/user.controller");

router.route("/").get(getAllUser);
router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
