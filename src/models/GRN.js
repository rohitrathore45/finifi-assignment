const mongoose = require("mongoose");

const grnItemSchema = new mongoose.Schema({
    itemCode: String,
    description: String,
    receivedQuantity: Number,
});

const grnSchema = new mongoose.Schema(
    {
        grnNumber: {
            type: String,
            required: true,
        },

        poNumber: {
            type: String,
            required: true,
        },

        grnDate: Date,

        items: [grnItemSchema],

        uploadedFilePath: String,

        rawText: String,

        extractedJson: Object,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("GRN", grnSchema);