const file = require("../models/uploadImages");

const getFiles = async (req, res, next) => {
  const files = await file.find({});

  return res.json({ Status: 200, message: files });
};

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

const deleteFile = async (req, res) => {
  const post = await file.findById(req.params.id);

  await post.remove();
  return res.sendStatus(200)

};

module.exports = {
  getFiles,
  registerMultiple,
  registerSingle,
  deleteFile,
};
