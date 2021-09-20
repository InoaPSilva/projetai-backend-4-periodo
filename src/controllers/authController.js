const express = require('express');

const userModel = require('../models/user');

const mongoose = require('mongoose')
const User = mongoose.model('user');
const _ = require('lodash');

const register = (req, res, next) => {
    // Needed informations to generate a user
    const user = new userModel();
    user.enrollment = req.body.enrollment;
    user.cpf = req.body.cpf;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function (err) {
        if (!err) {
            res.sendStatus(200)
        } else {
            return next(err);
        }
    })
};

const login = (req, res) => {

};

const teste = async (req, res, next) => {

};


module.exports = {
    login,
    register,
    teste
}