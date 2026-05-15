const normalizeText = (text) => {

    if (!text || typeof text !== "string") {
        return "";
    }
    
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, " ")
        .trim();
};

module.exports = normalizeText;