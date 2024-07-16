const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:4,
    }
})

const user_model = new mongoose.model("User",userSchema);

module.exports = user_model;