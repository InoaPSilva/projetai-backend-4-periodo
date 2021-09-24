const mongoose = require('mongoose');
const passport = require('passport');
const Project = require('../models/project');

// Register new projects
const register = (req, res, next) => {
     
    const newProject = new Project();
    
    newProject.image = ({name: req.body.name})
    
    newProject.title = req.body.title;
    newProject.summary = req.body.summary;
    newProject.objective = req.body.objective;
    newProject.class = req.body.class;

    newProject.save((err) => {
        if (!err){
            res.sendStatus(200);
        } else {
            return next(err);
        }
    })
};

const edit = async (req, res) => {
    await Project.updateOne({"_id": req.params.id },
    {
        $set: {
            title : req.body.title,
            summary : req.body.summary,
            objective : req.body.objective,
            class : req.body.class
        }
    }, (err)=>{
        if(!err){
            return res.sendStatus(400);
        } else {
            return res.send(200);
        }
    });

};

const display = async (req, res) => {
    
    const projects = await Project
    .find({"_id": req.params.id })
    .select('_id title summary objective class image');
    
    return res.json( {Status: 200, message: projects} );
};

// const generalDisplay = async (req, res) => {
//     const projects = await Project

//     projects
//     .find()
//     .select('_id title summary objective class');

//     return res.json( {Status: 200, message: projects} );
// };

const remove = async (req, res) => {
    await Project.deleteOne({_id: req.params.id}, (err, result)=>{
       return res.send(err)
    });
};

module.exports = {
    edit,
    register,
    display,
    // generalDisplay,
    remove
}