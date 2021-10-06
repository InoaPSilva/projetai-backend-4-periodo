const file = require("../models/uploadImages");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");


const registerMultiple = async (req, res, next) => {
  req.uploadUrl = [];
  await req.files.forEach((element) => {
    const newFile = new file();

    newFile.originalName = element.originalName;
    newFile.size = element.size;
    newFile.key = element.key;
    newFile.uploadUrl = element.uploadUrl;

    newFile.save((err) => {
      if (!err) {
        req.uploadUrl.push(newFile.url);
        console.log(req.uploadUrl);

      } else {
        res.send(err);
        next();
      }
    });
  });

  next();
};

const registerSingle = async (req, res, next) => {
  const newFile = new file();
  console.log(req.file);
  newFile.originalName = req.file.originalName;
  newFile.size = req.file.size;
  newFile.key = req.file.key;
  newFile.uploadUrl = req.file.uploadUrl;

  newFile.save((err) => {
    if (!err) {
      req.uploadUrl = newFile.url;
      console.log(req.uploadUrl);
      next();
    } else {
      res.send(err);

      next();
    }
  });
};

// adicionar remoção - mongoose
const removeFile = async (req, res) => {

  if (process.env.STORAGE_TYPE === "s3") {

    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        key: req.params.key
      })
      .promise().then((response) => {
        console.log(response.status);
      }).catch((response) => {
        console.log(response.status);
      });
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", req.params.key)
    );
  }
};

module.exports = {
  registerMultiple,
  registerSingle,
  removeFile
};
