const express = require("express");
const router = express.Router();

const JWT = require('../middleware/jwt');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.get("/auth", (req, res) => {
    res.send("Register on /user/register \n Enter on account on /user/login");
});

router.post('/user/register', authController.register)

router.post('/user/login', authController.login)

router.get('/user/display/:id?', userController.displayUser)

router.delete('/user/remove/:id?', JWT.verifyJwtToken, userController.removeUser)

router.put('/user/edit/:id?', JWT.verifyJwtToken, userController.editUser)

module.exports = app => app.use("/", router);