const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
    res.send("Works goddammit!");
});

module.exports = router;
