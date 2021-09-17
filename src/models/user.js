const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    enrollment:{
        type:String,
        unique:true,
        require:true
    },
    
    cpf:{
        type:String,
        unique:true,
        require:true
    },

    name: {
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true, 
        unique:true
    },
    
    password:{
        type:String,
        require:true
    },

    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    }
});

mongoose.model('user', userSchema);