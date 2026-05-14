const cleanDocumentText = (text) => {
    return (
        text
        // remove extra spaces
        .replace(/\s+/g, " ")

        // limit text size
        .slice(0, 15000)
    );
};

module.exports = cleanDocumentText;