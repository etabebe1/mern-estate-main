const express = require("express");
const router = express.Router();

const { user } = require("../controllers/user.controller");

router.route("/test").get(user);

module.exports = router;
