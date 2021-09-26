const express = require("express");
const router = express.Router();

const admController = require('../controllers/admController');
const JWT = require('../middleware/jwt');

router.get("/auth", (req, res) => {
    res.send("AdmRouting");
});

router.get('/guests/display/:id?', admController.displayGuest)

router.post('/guests/register', JWT.verifyJwtToken, admController.registerGuest)

router.delete('/guests/remove/:id?', JWT.verifyJwtToken, admController.removeGuest)

router.put('/guests/edit/:id?', JWT.verifyJwtToken, admController.editGuest)

router.get('/test', JWT.verifyJwtToken)


module.exports = app => app.use("/", router);