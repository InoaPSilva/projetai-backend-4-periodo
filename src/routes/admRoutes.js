const express = require("express");
const router = express.Router();

const admController = require('../controllers/admController');

router.get("/auth", (req, res) => {
    res.send("AdmRouting");
});

router.get('/guests/display/:id?', admController.displayGuest)

router.post('/guests/register', admController.registerGuest)

router.delete('/guests/remove/:id?', admController.removeGuest)

router.put('/guests/edit/:id?', admController.editGuest)


module.exports = app => app.use("/", router);