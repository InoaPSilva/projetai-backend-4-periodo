const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    accountType: {
        type: Number,
        default: 1,
        select: false
    },

    enrollment: {
        type: String,
        unique: true,
        require: true
    },

    cpf: {
        type: String,
        unique: true,
        require: true
    },

    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },
    class:{
        type: String,
        require: true    
    },

    password: {
        type: String,
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },

    saltSecret: {
        type: String,
        select: false
    }
});

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods / verify user password
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        'process.env.JWT_SECRET',
        { expiresIn: '30m' });
};

const user = mongoose.model('user', userSchema);

module.exports = user;