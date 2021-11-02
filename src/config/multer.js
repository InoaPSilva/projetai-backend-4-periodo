const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "tmp", "uploads")); //folder walk - locally saved files
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);
        // taking the key from the image and joining it with its name and format
        file.key = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);
        // taking the key from the image and joining it with its name and format
        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, fileName);
      });
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req, file, cb) => {
    // allowed formats for submission
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    // checking allowed formats
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type."));
    }
  },
};
