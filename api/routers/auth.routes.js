const express = require("express");
const router = express.Router();

const { sign_up, sign_in } = require("../controllers/auth.controller");

router.route("/sign-up").post(sign_up);
router.route("/sign-in").post(sign_in);

module.exports = router;
