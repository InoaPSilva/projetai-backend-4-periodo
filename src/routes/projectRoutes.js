const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfigs = require("../config/multer");

const jwt = require("../middleware/jwt");
const accountVerifier = require("../middleware/accountVerifier");
const projectController = require("../controllers/projectController");
const fileController = require("../controllers/fileController");

// Default get
// router.get("/auth", (req, res) => {
//     res.send("Register on /user/register \n Enter on account on /user/login");
// });

// projects
router.post(
  "/project/register",
  jwt.verifyJwtToken,
  multer(multerConfigs).array("files", 2),
  fileController.registerMultiple,
  projectController.register
);

router.put(
  "/project/edit/:id?",
  jwt.verifyJwtToken,
  accountVerifier.canEditProject,
  projectController.edit
);

router.delete(
  "/project/remove/:id?",
  jwt.verifyJwtToken,
  accountVerifier.canEditProject,
  projectController.remove
);

router.get("/project/:id?", projectController.display);

router.get(
  "/projectsByUser",
  jwt.verifyJwtToken,
  projectController.displayByAccount
);

router.get(
  "/projectsByCate/:cate?",
  jwt.verifyJwtToken,
  projectController.displayByAccount
);

// Test route
router.get("/file", fileController.getFiles);

router.delete("/fileDel/:id?", fileController.deleteFile);

module.exports = (app) => app.use("/", router);
