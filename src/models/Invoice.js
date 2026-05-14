const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
    itemCode: String,
    description: String,
    quantity: Number,
});

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
        },

        poNumber: {
            type: String,
            required: true,
        },

        invoiceDate: Date,

        items: [invoiceItemSchema],

        uploadedFilePath: String,

        rawText: String,

        extractedJson: Object,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Invoice",
    invoiceSchema
);