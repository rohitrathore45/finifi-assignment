const extractTextFromPDF = require("../utils/extractTextFromPDF");
const cleanDocumentText = require("../utils/cleanDocumentText");

const extractPO = require("./ai/extractPO");
const extractGRN = require("./ai/extractGRN");
const extractInvoice = require("./ai/extractInvoice");

const processDocument = async (filePath, documentType) => {
    try {
        const extractedText = await extractTextFromPDF(filePath);

        const rawText = cleanDocumentText(extractedText);

        let extractedData = null;

        if (documentType === "po") {
        extractedData = await extractPO(rawText);
        }

        if (documentType === "grn") {
        extractedData = await extractGRN(rawText);
        }

        if (documentType === "invoice") {
        extractedData = await extractInvoice(rawText);
        }

        return {
        rawText,
        extractedData,
        };
    } catch (error) {
        console.log(error);

        throw new Error("Document processing failed");
    }
};

module.exports = processDocument;