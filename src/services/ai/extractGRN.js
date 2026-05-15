const openai = require("./openaiClient");

const { grnPrompt } = require("./prompts");

const extractGRN = async (documentText) => {
    try {
        const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
            {
            role: "user",
            content: grnPrompt(documentText),
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

        throw new Error("GRN extraction failed");
    }
};

module.exports = extractGRN;

// const model = require("../../config/geminiClient");

// const {
//     grnPrompt,
// } = require("./prompts");

// const extractGRN = async (documentText) => {
//     try {
//         const prompt = grnPrompt(documentText);

//         const result = await model.generateContent(prompt);

//         const response = await result.response;

//         const text = response.text();

//         const cleanedText = text
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//         return JSON.parse(cleanedText);
//     } catch (error) {
//         console.log(error);

//         throw new Error("GRN extraction failed");
//     }
// };

// module.exports = extractGRN;