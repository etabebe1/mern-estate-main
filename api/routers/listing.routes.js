const express = require("express");
const router = express.Router();

const { verifyToken } = require("../utils/verifyUser");
const {
  createItem,
  getUserListing,
} = require("../controllers/listing.controller");

router.route("/create").post(createItem);
// router.route("/user/:id").get(getUserListing)
router.route("/user/:id").get(verifyToken, getUserListing);

module.exports = router;
