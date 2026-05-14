const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const documentType = req.body.documentType;

        let folder = "src/uploads/";

        if(documentType === "po") {
            folder += "po";
        } else if(documentType === "grn") {
            folder += "grn";
        } else if(documentType === "invoice") {
            folder += "invoice";
        }

        cb(null, folder);
    },

    filename: function (req, file, cb) {
        const uniqueName = 
            Date.now() + "-" + file.originalname.replace(/\s+/g, "_");

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedType = [".pdf"]

    const ext = path.extname(file.originalname);

    if (allowedType.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter
})

module.exports = upload;