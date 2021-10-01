const mongoose = require('mongoose');
const passport = require('passport');
const category = require('../models/category');

const register = (req, res, next) => {
    const newCategory = new category();
    newCategory.name = req.body.name;

    newCategory.save((err) => {
        if (!err) {
            res.sendStatus(200)
        } else {
            return next(err);
        }
    });
};

const remove = async (req, res) => { 
    await category.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.sendStatus(200)
        }
    });    
};

module.exports = {
    register,
    remove
};