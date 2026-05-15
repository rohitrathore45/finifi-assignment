const mongoose = require("mongoose");

const itemMatchSchema = new mongoose.Schema({
    description: String,

    poQuantity: {
        type: Number,
        default: 0,
    },

    grnQuantity: {
        type: Number,
        default: 0,
    },

    invoiceQuantity: {
        type: Number,
        default: 0,
    },

    status: String,

    issues: [String],
});

const matchResultSchema = new mongoose.Schema(
    {
        poNumber: {
            type: String,
            required: true,
            unique: true,
        },

        status: {
            type: String,

            enum: [
                "matched",
                "partially_matched",
                "mismatch",
                "insufficient_documents",
            ],
        },

        mismatches: [String],

        itemResults: [itemMatchSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "MatchResult",
    matchResultSchema
);