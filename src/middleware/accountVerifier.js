const project = require("../models/project");
const User = require("../models/user");

const verifyAccountType = async (req, res, next) => {
  const Users = await User.findOne({ _id: req._id }, { _id: 0 }).select(
    "accountType"
  );
  req.accountType = Users.accountType;

  if (req.accountType === 2) {
    req.role = req.accountType
    return next();
  } else {
  
    req.role = req.accountType
    next()
  }
};

const canEditProject = async (req, res, next) => {
  const projectOwnerId = await project
    .findOne({ "user._id": req._id })
    .select("_id");

  const Users = await User.findOne({ _id: req._id }, { _id: 0 }).select(
    "accountType"
  );
  req.accountType = Users.accountType;

  if (req.accountType === 2) {
    return next();
  } else if( projectOwnerId === req._id){
    return next();
  }else {
    console.log(req._id);
    console.log(req.accountType);
    return res.send(
      "Esta conta não possui acesso a esta funcionalidade ou ocorreu algum erro de cadastro..."
    );
  }
};

module.exports = {
  verifyAccountType,
  canEditProject,
};
