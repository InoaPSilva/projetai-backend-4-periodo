const mongoose = require('mongoose');
const Guest = require('../models/guest');

// register user
const registerGuest = (req, res, next) => {
    // Needed informations to generate a user
    const newGuest = new Guest();
    newGuest.name = req.body.name;
    newGuest.role = req.body.role;
    newGuest.linkedin = req.body.linkedin;
    newGuest.github = req.body.github;

    // catching error
    newGuest.save((err) => {
        if (!err) {
            res.sendStatus(200)
        } else {
            return next(err);
        }
    });
};

// display Guests
const displayGuest = async (req, res, next) => {
    if(req.params.id){
    const Guests  = await Guest
        .find({"_id": req.params.id })
        .select('_id name role linkedin github ');
    return res.json( {Status: 200, message: Guests} );
    } else {
        const Guests  = await Guest
        .find({})
        .select('_id name role linkedin github ');
    return res.json( {Status: 200, message: Guests} );
    }
   
 };

 const removeGuest = async (req, res) => {
    await Guest.deleteOne({_id: req.params.id}, (err, result)=>{
        if(err){
            return res.send(err)
        } else {
            return res.sendStatus(200)
        }
    });
};

const editGuest = async (req, res) => {
    await Guest.updateOne({"_id": req.params.id },
    {
        $set: {
        name : req.body.name,
        role : req.body.role,
        linkedin : req.body.linkedin,
        github : req.body.github
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
    registerGuest,
    displayGuest,
    removeGuest,
    editGuest
}