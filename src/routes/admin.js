const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const user = require('../controllers/userController')

app.get("/", (req, res) => {
    res.send("Works goddammit!");
});

app.post('/user/register', user)

module.exports = router;
