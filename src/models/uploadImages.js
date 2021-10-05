const mongoose = require('mongoose');
const aws = require("aws-sdk");
const { promisify } = require("util");

const imageSchema = new mongoose.Schema({
    originalname: String,
    size: Number,
    key: String, 
    url: String,
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

imageSchema.pre("save", function() {
    if (!this.url) {
      this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

const image = mongoose.model('image', imageSchema);

module.exports = image;