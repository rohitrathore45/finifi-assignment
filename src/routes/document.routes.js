const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
    uploadDocument,
} = require("../controllers/document.controller");

router.post(
    "/upload",
    upload.single("file"),
    uploadDocument
);

module.exports = router;