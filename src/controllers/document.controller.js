const processDocument = require("../services/documentProcessor");
const formatDate = require("../utils/formatDate");

const PurchaseOrder = require("../models/PurchaseOrder");
const GRN = require("../models/GRN");
const Invoice = require("../models/Invoice");

const uploadDocument = async (req, res) => {
    try {
        const filePath = req.file.path;

        const documentType = req.body.documentType;

        console.log(req.file);

        const result = await processDocument(
        filePath,
        documentType
        );

        let savedDocument = null;

        if (documentType === "po") {
            const existingPO = await PurchaseOrder.findOne({
                poNumber: result.extractedData.poNumber,
            });

            if (existingPO) {
                return res.status(400).json({
                success: false,
                message: "PO already exists",
                });
            }

            savedDocument = await PurchaseOrder.create({
                ...result.extractedData,

                poDate: formatDate(result.extractedData.poDate),

                uploadedFilePath: filePath,

                rawText: result.rawText,

                extractedJson: result.extractedData,
            });
        }

        if (documentType === "grn") {
            const existingGRN = await GRN.findOne({
                grnNumber: result.extractedData.grnNumber,
            });

            if (existingGRN) {
                return res.status(400).json({
                success: false,
                message: "GRN already exists",
                });
            }

            savedDocument = await GRN.create({
                ...result.extractedData,

                grnDate: formatDate(result.extractedData.grnDate),

                uploadedFilePath: filePath,

                rawText: result.rawText,

                extractedJson: result.extractedData,
            });
        }

        if (documentType === "invoice") {
            const existingInvoice = await Invoice.findOne({
                invoiceNumber: result.extractedData.invoiceNumber,
            });

            if (existingInvoice) {
                return res.status(400).json({
                success: false,
                message: "Invoice already exists",
                });
            }

            savedDocument = await Invoice.create({
                ...result.extractedData,

                invoiceDate: formatDate(result.extractedData.invoiceDate),

                uploadedFilePath: filePath,

                rawText: result.rawText,

                extractedJson: result.extractedData,
            });
        }

        return res.status(201).json({
        success: true,
        message: "Document processed successfully",

        data: savedDocument,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

module.exports = {
    uploadDocument,
};