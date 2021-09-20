const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController')

router.get("/", (req, res) => {
    res.send("Works goddammit!");
});

router.post('/register', authController.register)

router.post('/user/login',  authController.login)

router.get('/teste',  authController.teste)

module.exports = app => app.use("/", router);