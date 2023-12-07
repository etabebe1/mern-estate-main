const express = require("express");
const router = express.Router();

const { verifyToken } = require("../utils/verifyUser");
const { updateUser } = require("../controllers/user.controller");

router.route("/update/:id").post(verifyToken, updateUser);

module.exports = router;
