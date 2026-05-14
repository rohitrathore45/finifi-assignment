const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/uploads");
    },

    filename: function (req, file, cb) {
        const uniqueName =
        Date.now() + "-" + file.originalname.replace(/\s+/g, "_");

        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext === ".pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;