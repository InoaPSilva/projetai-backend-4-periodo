const Project = require('../models/project');
const user = require('../models/user');

const display = async (req, res) => {
    if (req.params.id) {
        const projects = await Project
            .find({ "_id": req.params.id })
            .select('_id title summary objective class image user');

        return res.json({ Status: 200, message: projects });
    } else {
        const projects = await Project
            .find({})
            .select('_id title summary objective class image user');

        return res.json({ Status: 200, message: projects });
    }
};

// Register new projects
const register = async(req, res, next) => {

    const newProject = new Project();
    // newProject.image = ({name: req.body.name})
    req.user = await user.find({"_id":req._id}, {__v: 0 , password: false});
    console.log(req.user);
    newProject.title = req.body.title;
    newProject.summary = req.body.summary;
    newProject.objective = req.body.objective;
    newProject.user.push(req.user[0]);
    console.log(newProject.user);
    newProject.save((err) => {
        if (!err) {
            res.sendStatus(200);
        } else {
            return next(err);
        }
    });
};

const edit = async (req, res) => {
    await Project.updateOne({ "_id": req.params.id },
        {
            $set: {
                title: req.body.title,
                summary: req.body.summary,
                objective: req.body.objective,
            }
        }, (err) => {
            if (err) {
                return res.sendStatus(400);
            } else {
                return res.send(200);
            }
        });
};

const remove = async (req, res) => {
    await Project.deleteOne({ "_id": req.params.id }, (err, result) => {
        return res.send(err)
    });
};

const displayByAccount = async (req, res) => {
    const projects = await Project
        .findOne({ "user[0]._id": req._id });
    return res.json({ Status: 200, message: projects });
};

module.exports = {
    edit,
    register,
    remove,
    display,
    displayByAccount
};