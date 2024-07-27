const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
        default:'NORMAL'
    },
    password:{
        type:String,
        required:true,
        minLength:4,
    }
})

const user_model = new mongoose.model("User",userSchema);

module.exports = user_model;