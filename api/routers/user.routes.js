const express = require("express");
const router = express.Router();

const { verifyToken } = require("../utils/verifyUser");
const { updateUser, deleteUser } = require("../controllers/user.controller");

router.route("/update/:id").post(verifyToken, updateUser);
router.route("/delete/:id").post(verifyToken, deleteUser)

module.exports = router;
