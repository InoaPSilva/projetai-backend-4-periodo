const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    
});

const project = mongoose.model('project', projectSchema);

module.exports = project;