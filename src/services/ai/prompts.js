const poPrompt = (documentText) => `
Extract structured JSON from this Purchase Order document.

IMPORTANT RULES:
- Return ONLY valid JSON
- Do not include markdown
- Do not include explanations
- vendorName must be SUPPLIER/VENDOR name only
- Do NOT use buyer company name
- itemCode must contain only actual product/item code
- NEVER merge HSN code with quantity
- quantity must contain only ordered quantity
- quantity must be numeric
- Dates must be returned in YYYY-MM-DD format
- Ignore tax/legal/terms sections
- Extract only product table items

Schema:

{
    "poNumber": "",
    "poDate": "",
    "vendorName": "",
    "items": [
        {
        "itemCode": "",
        "description": "",
        "quantity": 0
        }
    ]
}

DOCUMENT:
${documentText}
`;

const grnPrompt = (documentText) => `
Extract structured JSON from this Goods Receipt Note (GRN).

IMPORTANT RULES:
- Return ONLY valid JSON
- Do not include markdown
- Do not include explanations
- itemCode must contain only actual product/item code
- receivedQuantity must contain only received quantity
- receivedQuantity must be numeric
- Dates must be returned in YYYY-MM-DD format
- Ignore tax/legal/terms sections
- Extract only product table items

Schema:

{
    "grnNumber": "",
    "poNumber": "",
    "grnDate": "",
    "items": [
        {
        "itemCode": "",
        "description": "",
        "receivedQuantity": 0
        }
    ]
}

DOCUMENT:
${documentText}
`;

const invoicePrompt = (documentText) => `
Extract structured JSON from this Invoice document.

IMPORTANT RULES:
- Return ONLY valid JSON
- Do not include markdown
- Do not include explanations
- vendorName must be supplier/vendor only
- itemCode must contain only actual product/item code
- quantity must contain only invoiced quantity
- quantity must be numeric
- Dates must be returned in YYYY-MM-DD format
- Ignore tax/legal/terms sections
- Extract only product table items

Schema:

{
    "invoiceNumber": "",
    "poNumber": "",
    "invoiceDate": "",
    "vendorName": "",
    "items": [
        {
        "itemCode": "",
        "description": "",
        "quantity": 0
        }
    ]
}

DOCUMENT:
${documentText}
`;
module.exports = {
    poPrompt,
    grnPrompt,
    invoicePrompt,
};