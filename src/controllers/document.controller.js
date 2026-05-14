const uploadDocument = async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.body);

        return res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: req.file,
        });
    } catch(error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadDocument
}