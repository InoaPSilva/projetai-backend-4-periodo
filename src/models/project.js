const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

    // image:{
    //     type: Schema.Types.ObjectId, 
    //     ref:'image'
    // },

    user:[],

    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }

});

const project = mongoose.model('project', projectSchema);

module.exports = project;