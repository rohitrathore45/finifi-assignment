const PurchaseOrder = require("../../models/PurchaseOrder");
const GRN = require("../../models/GRN");
const Invoice = require("../../models/Invoice");
const MatchResult = require("../../models/MatchResult");

const normalizeText = require("../../utils/normalizeText");

const runMatchingEngine = async (poNumber) => {
    try {
        const po = await PurchaseOrder.findOne({ poNumber });

        const grns = await GRN.find({ poNumber });

        const invoices = await Invoice.find({ poNumber });

        // insufficient docs
        if (!po) {
            return null;
        }

        const itemResults = [];

        const mismatches = [];

        for (const poItem of po.items) {
            if (!poItem.description) continue;
            const normalizedPODescription = normalizeText(
                poItem.description
            );

            let totalGRNQuantity = 0;

            let totalInvoiceQuantity = 0;

            // GRN matching
            for (const grn of grns) {
                for (const grnItem of grn.items) {
                const normalizedGRNDescription =
                    normalizeText(grnItem.description);

                if (
                    normalizedPODescription ===
                    normalizedGRNDescription
                ) {
                    totalGRNQuantity +=
                    grnItem.receivedQuantity || 0;
                }
                }
            }

            // Invoice matching
            for (const invoice of invoices) {
                for (const invoiceItem of invoice.items) {
                    const normalizedInvoiceDescription =
                        normalizeText(invoiceItem.description);

                    if (
                        normalizedPODescription ===
                        normalizedInvoiceDescription
                    ) {
                        totalInvoiceQuantity +=
                        invoiceItem.quantity || 0;
                    }
                }
            }

            const issues = [];

            let itemStatus = "matched";

            // Rule 1
            if (totalGRNQuantity > poItem.quantity) {
                issues.push(
                "GRN quantity exceeds PO quantity"
                );

                itemStatus = "mismatch";
            }

            // Rule 2
            if (totalInvoiceQuantity > totalGRNQuantity) {
                issues.push(
                "Invoice quantity exceeds GRN quantity"
                );

                itemStatus = "mismatch";
            }

            // Rule 3
            if (totalInvoiceQuantity > poItem.quantity) {
                issues.push(
                "Invoice quantity exceeds PO quantity"
                );

                itemStatus = "mismatch";
            }

            // partial docs
            if (
                totalGRNQuantity === 0 ||
                totalInvoiceQuantity === 0
            ) {
                itemStatus = "partially_matched";
            }

            if (issues.length > 0) {
                mismatches.push(...issues);
            }

            itemResults.push({
                description: poItem.description,

                poQuantity: poItem.quantity,

                grnQuantity: totalGRNQuantity,

                invoiceQuantity: totalInvoiceQuantity,

                status: itemStatus,

                issues,
            });

            for (const invoice of invoices) {

                if (
                    invoice.invoiceDate &&
                    po.poDate &&
                    new Date(invoice.invoiceDate) >
                        new Date(po.poDate)
                ) {

                    if (
                        !mismatches.includes(
                            "Invoice date after PO date"
                        )
                    ) {

                        mismatches.push(
                            "Invoice date after PO date"
                        );
                    }
                }
            }
        }

        // final status
        let finalStatus = "matched";

        // if any item is partial
        const hasPartialItems = itemResults.some(
            (item) => item.status === "partially_matched"
        );

        // if any item mismatch
        const hasMismatchItems = itemResults.some(
            (item) => item.status === "mismatch"
        );

        const hasDateMismatch =
            mismatches.includes(
                "Invoice date after PO date"
            );

        if (hasPartialItems) {
            finalStatus = "partially_matched";
        }

        if (hasMismatchItems) {
            finalStatus = "mismatch";
        }

        // save/update result
        const result =
            await MatchResult.findOneAndUpdate(
                { poNumber },

                {
                    poNumber,

                    status: finalStatus,

                    mismatches,

                    itemResults,
                },

                {
                    upsert: true,
                    new: true,
                }
            );

        return result;
    } catch (error) {
        console.log(error);

        throw new Error("Matching engine failed");
    }
};

module.exports = runMatchingEngine;