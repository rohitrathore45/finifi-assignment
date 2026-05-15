const express = require("express");

const router = express.Router();

const { getMatchResult } = require("../controllers/match.controller");

router.get("/:poNumber", getMatchResult);

module.exports = router;