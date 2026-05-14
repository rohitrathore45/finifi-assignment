const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
    try {
        console.log("Reading file from:", filePath);

        const dataBuffer = fs.readFileSync(filePath);

        const pdfData = await pdfParse(dataBuffer);

        console.log("PDF text extracted successfully");

        return pdfData.text;
    } catch (error) {
        console.log("PDF Extraction Error:", error);

        throw new Error("Failed to extract PDF text");
    }
};

module.exports = extractTextFromPDF;