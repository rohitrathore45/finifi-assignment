const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const documentRoutes = require("./routes/document.routes")
const matchRoutes = require("./routes/match.routes")

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/documents", documentRoutes);
app.use("/match", matchRoutes)

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Three way matching engine API running"
    })
})

module.exports = app;