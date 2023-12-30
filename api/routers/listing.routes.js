const express = require("express");
const router = express.Router();

const { verifyToken } = require("../utils/verifyUser");
const {
  createItem,
  getUserListing,
} = require("../controllers/listing.controller");

router.route("/create").post(createItem);
router.route("/user/:id").post(verifyToken, getUserListing);

module.exports = router;
