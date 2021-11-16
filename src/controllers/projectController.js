const Project = require("../models/project");
const user = require("../models/user");

const display = async (req, res) => {
  if (req.params.id) {
    const projects = await Project.find({ _id: req.params.id }).select(
      "_id title summary objective class icon user category"
    );

    return res.json({ Status: 200, message: projects });
  } else {
    const projects = await Project.find({}).select(
      "_id title summary objective class icon user category"
    );

    return res.json({ Status: 200, message: projects });
  }
};

const displayByAccount = async (req, res) => {
  const projects = await Project.findOne({ "user[0]._id": req._id });
  return res.json({ Status: 200, message: projects });
};

const displayByCategory = async (req, res) => {
  const projects = await Project.findOne({ category: req.params.cate });
  return res.json({ Status: 200, message: projects });
};

// Register new projects
const register = async (req, res, next) => {
  const newProject = new Project();

  req.user = await user.find({ _id: req._id }, { __v: 0, password: false });
  newProject.icon = req.uploadUrl[0];
  newProject.banner = req.uploadUrl[1];
  newProject.title = req.body.title;
  newProject.summary = req.body.summary;
  newProject.category = req.body.category;
  newProject.objective = req.body.objective;
  newProject.user.push(req.user[0]);
try{
  newProject.save((err) => {
    if (!err) {
      res.sendStatus(200);
    } else {
      return next(err);
    }
  });
} catch {
  console.log("error");

}
};

const edit = async (req, res) => {
  try{
    await Project.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          objective: req.body.objective,
        },
      },
    );
    res.sendStatus(200)
  } catch(error){
    console.log("dont work");
  }



};

const remove = async(req, res) => {
  try{
    await Project.deleteOne({ _id: req.params.id })
    res.sendStatus(200)
  } 
  catch(error){
    console.log(error);
  }
}

module.exports = {
  edit,
  register,
  remove,
  display,
  displayByAccount,
  displayByCategory,
};
