const express = require("express");
const router = express.Router();

const { createItem } = require("../controllers/listing.controller");

router.route("/create").post(createItem);

module.exports = router;
