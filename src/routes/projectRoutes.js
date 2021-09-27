const express = require("express");
const router = express.Router();

const JWT = require('../middleware/jwt');
const projectController = require('../controllers/projectController')

router.get("/auth", (req, res) => {
    res.send("Register on /user/register \n Enter on account on /user/login");
});

router.post('/project/register', JWT.verifyJwtToken, projectController.register);

router.put('/project/edit/:id?', projectController.edit);

router.delete('/project/remove/:id?', JWT.verifyJwtToken, projectController.remove)

router.get('/project/:id?', projectController.display);

router.get('/projectsByUser', JWT.verifyJwtToken, projectController.displayByAccount);

module.exports = app => app.use("/", router);