const express = require("express");
const router = express.Router();

const jwt = require('../middleware/jwt');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const mailer = require('../config/mailer');
const accountVerifier = require('../middleware/accountVerifier')
router.get("/auth", (req, res) => {
    res.send("Register on /user/register \n Enter on account on /user/login");
});

router.post('/user/register', authController.register);

router.post('/user/login', authController.login);

router.get('/user/display/:id?', userController.displayUser);

router.delete('/user/remove/:id?', jwt.verifyJwtToken, accountVerifier.verifyAccountType, userController.removeUser);

router.put('/user/edit/:id?', jwt.verifyJwtToken, userController.editUser);

router.all('/userPassRetrival', mailer.sendEmail, userController.forgotUser);

router.get('/tokenTest', jwt.verifyJwtToken, userController.tokenTest);

module.exports = app => app.use("/", router);