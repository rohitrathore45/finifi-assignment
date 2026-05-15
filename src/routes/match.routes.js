const express = require("express");

const router = express.Router();

const { getMatchResult, getAllMatchResults, getMismatchResults, getMatchSummary } = require("../controllers/match.controller");

// SUMMARY
router.get("/summary", getMatchSummary);

// MISMATCHES
router.get("/mismatches", getMismatchResults);

// GET ALL
router.get("/", getAllMatchResults);

// GET SINGLE
router.get("/:poNumber", getMatchResult);

module.exports = router;