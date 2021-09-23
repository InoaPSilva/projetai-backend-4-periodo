const express = require("express");
const router = express.Router();

const projectController = require('../controllers/projectController')

router.get("/auth", (req, res) => {
    res.send("Register on /user/register \n Enter on account on /user/login");
});

router.post('/project/register', projectController.register);

router.put('/project/edit/:id?',  projectController.edit);

router.get('/project/:id?', projectController.display);

router.delete('/project/remove/:id?', projectController.remove)

module.exports = app => app.use("/", router);