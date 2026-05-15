const PurchaseOrder = require("../models/PurchaseOrder");
const GRN = require("../models/GRN");
const Invoice = require("../models/Invoice");

const getParsedDocument = async (req, res) => {
    try {
        const { id } = req.params;

        let document =
        await PurchaseOrder.findById(id);

        if (!document) {
            document = await GRN.findById(id);
        }

        if (!document) {
            document = await Invoice.findById(id);
        }

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: document,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getParsedDocument,
};