const openai = require("./openaiClient");

const { invoicePrompt } = require("./prompts");

const extractInvoice = async (documentText) => {
    try {
        const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
            {
            role: "user",
            content: invoicePrompt(documentText),
            },
        ],

        temperature: 0,

        response_format: {
            type: "json_object",
        },
        });

        const parsedData = JSON.parse(
        completion.choices[0].message.content
        );

        return parsedData;
    } catch (error) {
        console.log(error);

        throw new Error("Invoice extraction failed");
    }
};

module.exports = extractInvoice;