const mongoose = require('mongoose');
const User = require('../models/user');

// display Users
const displayUser = async (req, res, next) => {
    if(req.params.id){
    const Users  = await User
        .find({"_id": req.params.id })
        .select('_id enrollment cpf name email password ');
    return res.json( {Status: 200, message: Users} );
    } else {
        const Users  = await User
        .find({})
        .select('_id enrollment cpf name email password');
    return res.json( {Status: 200, message: Users} );
    }
   
 };

 const removeUser = async (req, res) => {
    await User.deleteOne({_id: req.params.id}, (err, result)=>{
        if(err){
            return res.send(err)
        } else {
            return res.sendStatus(200)
        }
    });
};

const editUser = async (req, res) => {
    await User.updateOne({"_id": req.params.id },
    {
        $set: {
            enrollment : req.body.enrollment,
            cpf : req.body.cpf,
            name : req.body.name,
            email : req.body.email,
            password : password
        }
    }, (err)=>{
        if(err){
            return res.sendStatus(400);
        } else {
            return res.send(200);
        }
    });

};

module.exports = {
    displayUser,
    removeUser,
    editUser
}