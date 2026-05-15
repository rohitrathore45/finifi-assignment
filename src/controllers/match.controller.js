const MatchResult = require("../models/MatchResult");

const getMatchResult = async (req, res) => {
    try {
        const { poNumber } = req.params;

        const result = await MatchResult.findOne({
            poNumber
        })

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Match result not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getMatchResult
}