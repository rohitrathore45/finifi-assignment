const mongoose = require("mongoose");

const poItemSchema = new mongoose.Schema({
  itemCode: String,
  description: String,
  quantity: Number,
});

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: {
      type: String,
      required: true,
      unique: true,
    },

    poDate: Date,

    vendorName: String,

    items: [poItemSchema],

    uploadedFilePath: String,

    rawText: String,

    extractedJson: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PurchaseOrder",
  purchaseOrderSchema
);