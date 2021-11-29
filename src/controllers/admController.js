const Guest = require("../models/guest");
// const mongoose = require('mongoose');

// display Guests by id
const displayGuest = async (req, res, next) => {
  if (req.params.id) {
    const Guests = await Guest.find({ _id: req.params.id }).select(
      "_id name role linkedin github profilePic type"
    );
    return res.json({ Status: 200, message: Guests });
  } else {
    const Guests = await Guest.find({}).select(
      "_id name role linkedin github profilePic type"
    );
    return res.json({ Status: 200, message: Guests });
  }
};

// register user
const registerGuest = (req, res, next) => {
  // Needed informations to generate a user
  console.log(req.uploadUrl);
  const newGuest = new Guest();
  newGuest.name = req.body.name;
  newGuest.role = req.body.role;
  newGuest.profilePic = req.uploadUrl;
  newGuest.type = req.type;

  newGuest.linkedin = req.body.linkedin;
  newGuest.github = req.body.github;

  // catching error
  newGuest.save((err) => {
    if (!err) {
      res.sendStatus(200);
    } else {
      return next(err);
    }
  });
};

// update guest by id
const editGuest = async (req, res) => {
  try{
    console.log(req.body);
    await Guest.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          role: req.body.role,
          linkedin: req.body.linkedin,
          github: req.body.github,
          type:  req.body.type,
        },
      },
    );
    res.sendStatus(200)
  } catch(error){
    console.log(error);
  }

};

const displayGuestByType = async (req, res, next) => {
 try {
    const Guests = await Guest.find({ _id: req.params.id }).select(
      "_id name role linkedin github profilePic type"
    );
    return res.json({ Status: 200, message: Guests });
  } catch(e) {
    console.log(e);
    
  }
};

// delete guest by id
const removeGuest = async (req, res) => {
  try {
    await Guest.deleteOne({ _id: req.params.id }, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        return res.sendStatus(200);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  registerGuest,
  displayGuest,
  removeGuest,
  editGuest,
  displayGuestByType
};
