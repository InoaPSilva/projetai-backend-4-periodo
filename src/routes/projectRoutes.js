const express = require("express");
const router = express.Router();

const jwt = require('../middleware/jwt');
const accountVerifier = require('../middleware/accountVerifier');
const categoryController = require('../controllers/categoryController');
const projectController = require('../controllers/projectController');


router.get("/auth", (req, res) => {
    res.send("Register on /user/register \n Enter on account on /user/login");
});

router.post('/project/register', jwt.verifyJwtToken, projectController.register);

router.put('/project/edit/:id?', projectController.edit);

router.delete('/project/remove/:id?', jwt.verifyJwtToken, projectController.remove);

router.get('/project/:id?', projectController.display);

router.get('/projectsByUser', jwt.verifyJwtToken, projectController.displayByAccount);

router.post('/category/register', jwt.verifyJwtToken, accountVerifier.verifyAccountType, categoryController.register);

router.post('/category/remove', jwt.verifyJwtToken, accountVerifier.verifyAccountType, categoryController.remove);


module.exports = app => app.use("/", router);