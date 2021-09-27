// const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

// register user
const register = (req, res, next) => {
    // Needed informations to generate a user
    const user = new User();
    user.enrollment = req.body.enrollment;
    user.cpf = req.body.cpf;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    // catching error
    user.save((err) => {
        if (!err) {
            res.sendStatus(200)
        } else {
            return next(err);
        }
    });
};

// authenticate user
const login = (req, res, next) => {
    // calls passport middleware
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        }
        else if (user) {
            return res.status(200).json({ "token": user.generateJwt() });
        }
        else {
            return res.status(404).json(info);
        }
    })(req, res, next);
};

module.exports = {
    login,
    register
}