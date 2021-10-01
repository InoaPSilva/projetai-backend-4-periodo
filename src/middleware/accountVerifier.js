const User = require("../models/user");

const verifyAccountType = async (req, res, next) => {
    const Users = await User
        .findOne({ "_id": req._id }, {_id: 0 })
        .select('accountType');
    req.accountType = Users.accountType;

    if (req.accountType === 2){
        return next();
    } else {
        return res.send("Esta conta não possui acesso a esta funcionalidade ou ocorreu algum erro de cadastro...")
    }
};


module.exports = { verifyAccountType };