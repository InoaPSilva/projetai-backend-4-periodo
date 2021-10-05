const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        require: true,
    },
    objective: {
        type: String,
        require: true,
    },

    category: {
        Type: String,
    },

    user:[],

    icon: String,
    
    // banner: String,

    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }

});

const project = mongoose.model('project', projectSchema);

module.exports = project;
