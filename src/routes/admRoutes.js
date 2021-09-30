const express = require("express");
const router = express.Router();

const admController = require('../controllers/admController');
const jwt = require('../middleware/jwt');

router.get("/auth", (req, res) => {
    res.send("AdmRouting");
});

router.get('/guests/display/:id?', admController.displayGuest);

router.post('/guests/register', jwt.verifyJwtToken, admController.registerGuest);

router.delete('/guests/remove/:id?', jwt.verifyJwtToken, admController.removeGuest);

router.put('/guests/edit/:id?', jwt.verifyJwtToken, admController.editGuest);

router.get('/test', jwt.verifyJwtToken);

module.exports = app => app.use("/", router);