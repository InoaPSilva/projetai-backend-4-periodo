const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

router.get("/auth", (req, res) => {
    res.send("Register on /user/register \n Enter on account on /user/login");
});

router.post('/user/register', authController.register)

router.post('/user/login', authController.login)

// Falta remoção e edição

module.exports = app => app.use("/", router);