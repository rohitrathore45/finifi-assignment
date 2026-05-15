const MatchResult = require("../models/MatchResult");


// GET SINGLE MATCH
const getMatchResult = async (req, res) => {
    try {
        const { poNumber } = req.params;

        const result = await MatchResult.findOne({
            poNumber,
        });

        if (!result) {
        return res.status(404).json({
            success: false,
            message: "Match result not found",
        });
        }

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET ALL MATCH RESULTS
const getAllMatchResults = async (req, res) => {
    try {
        const results = await MatchResult.find().sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            count: results.length,
            data: results,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET ONLY MISMATCHES
const getMismatchResults = async (req, res) => {
    try {
        const results = await MatchResult.find({
            status: "mismatch",
        });

        return res.status(200).json({
            success: true,
            count: results.length,
            data: results,
        });
    } catch (error) {
            return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// DASHBOARD SUMMARY
const getMatchSummary = async (req, res) => {
    try {
        const matched = await MatchResult.countDocuments({
            status: "matched",
        });

        const mismatched =
            await MatchResult.countDocuments({
                status: "mismatch",
            });

        const partial =
            await MatchResult.countDocuments({
                status: "partially_matched",
            });

        return res.status(200).json({
            success: true,

            data: {
                matched,

                mismatched,

                partiallyMatched: partial,

                total:
                matched +
                mismatched +
                partial,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    getMatchResult,

    getAllMatchResults,

    getMismatchResults,

    getMatchSummary,
};