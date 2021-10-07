const User = require('../models/user');
// const mongoose = require('mongoose');

// display Users by id
const displayUser = async (req, res, next) => {
    if (req.params.id) {
        const Users = await User
            .findOne({ "_id": req.params.id }, {__v: 0 });
        return res.json({ Status: 200, message: Users });
    } else {
        const Users = await User
            .find({}, {__v: 0 , password: false});
        return res.json({ Status: 200, message: Users });

    }
};

// update Users by id
const editUser = async (req, res) => {
    await User.updateOne({ "_id": req.params.id },
        {
            $set: {
                enrollment: req.body.enrollment,
                cpf: req.body.cpf,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                class: req.body.class
            }
        }, (err) => {
            if (err) {
                return res.sendStatus(400);
            } else {
                return res.send(200);
            }
        });
};

// delete Uses by id
const removeUser = async (req, res) => {
    await User.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.sendStatus(200)
        }
    });
};

const forgotUser = async (req, res) => {
    console.log(req.email);
    if (req.method === "PUT") {
        newUser = await User
            .updateOne({ email: req.email },
                {
                    $set: { password: req.body.password }
                }, (err) => {
                    if (err) {
                        return res.sendStatus(400);
                    } else {
                        return res.sendStatus(200);
                    }
                });
    }
};

const tokenTest = (req, res) => {
    res.send({ Token: req.logged, Msg: "Works..." });
};

module.exports = {
    displayUser,
    removeUser,
    editUser,
    forgotUser,
    tokenTest
};