const mongoose = require('mongoose');
const {Types: {Long}} = mongoose;
require('mongoose-long')(mongoose);

const projectSchema = new mongoose.Schema({
    summary:{
        type: Long,
        require:true,
    },
    objective:{
        type: Long,
        require:true,
    },
    
    // pics:{},
    
    class:{
        type:String,
        require:true,
    },

    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },

});

const project = mongoose.model('project', projectSchema);

module.exports = project;