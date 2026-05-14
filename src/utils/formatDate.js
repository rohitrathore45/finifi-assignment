const formatDate = (dateString) => {
    try {
        if (!dateString) return null;

        const isoDate = new Date(dateString);

        if (!isNaN(isoDate.getTime())) {
        return isoDate;
        }

        if (dateString.includes("-")) {
        const parts = dateString.split("-");

        if (parts.length === 3) {
            const [day, month, year] = parts;

            const parsedDate = new Date(
            `${year}-${month}-${day}`
            );

            if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
            }
        }
        }

        if (dateString.includes("/")) {
        const parts = dateString.split("/");

        if (parts.length === 3) {
            const [day, month, year] = parts;

            const parsedDate = new Date(
            `${year}-${month}-${day}`
            );

            if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
            }
        }
        }

        return null;
    } catch (error) {
        return null;
    }
};

module.exports = formatDate;