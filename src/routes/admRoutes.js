const express = require("express");
const router = express.Router();
const multer = require("multer");

const fileController = require("../controllers/fileController");
const multerConfigs = require("../config/multer");
const admController = require("../controllers/admController");
const accountVerifier = require("../middleware/accountVerifier");
const jwt = require("../middleware/jwt");

router.get("/auth", (req, res) => {
  res.send("AdmRouting");
});

router.get("/guests/display/:id?", admController.displayGuest);

router.post(
  "/guests/register",
  jwt.verifyJwtToken,
  accountVerifier.canEditProject,
  multer(multerConfigs).single("file"),
  fileController.registerSingle,
  admController.registerGuest
);

router.delete(
  "/guests/remove/:id?",
  jwt.verifyJwtToken,
  accountVerifier.canEditProject,
  admController.removeGuest
);

router.put(
  "/guests/edit/:id?",
  jwt.verifyJwtToken,
  accountVerifier.canEditProject,
  admController.editGuest
);

module.exports = (app) => app.use("/", router);
