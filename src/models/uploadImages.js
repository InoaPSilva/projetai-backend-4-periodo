const mongoose = require("mongoose");
const fs = require("fs");
const aws = require("aws-sdk");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const imageSchema = new mongoose.Schema({
  originalname: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

imageSchema.pre("save", function () {
  if (!this.url) {
    this.url = `https://${ process.env.BUCKET_NAME }.s3.${ process.env.AWS_DEFAULT_REGION }.amazonaws.com/${ this.key }`;
  }
});

imageSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: this.key,
    };
    return s3
      .deleteObject(params)
      .promise()
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});

const image = mongoose.model("image", imageSchema);

module.exports = image;
