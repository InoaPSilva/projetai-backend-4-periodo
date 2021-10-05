const file = require('../models/uploadImages');

const register = async(req, res, next) => {
    const { originalname: name, size, key, location: url = "" } = req.file;
    const newFile = await file.create({
        name,
        size,
        key,
        url
    });
    req.uploadUrl = newFile.url;
    next()
};

module.exports = {
    register,
};