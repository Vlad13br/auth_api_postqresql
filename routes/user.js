const express = require("express");

const auth = require("../middlewares/auth");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const validation = require("../middlewares/validation");
const { register, login, logout, getCurrent } = require("../controllers/user");

const router = express.Router();

router.post("/register", ctrlWrapper(register)); //

router.post("/login", ctrlWrapper(login)); //

router.put("/logout", auth, ctrlWrapper(logout)); //

router.get("/current", auth, ctrlWrapper(getCurrent)); //

module.exports = router;
