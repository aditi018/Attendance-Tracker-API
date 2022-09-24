const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9)](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type:String,
        required:true,
    },
    employeeid:{
        type:String,
        unique:true,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    onLeave:{
        type:Boolean,
        default:false,
    },
    leaveCount:{
        type:Number,
        default:5,
    },
}, {timestamp: true});

module.exports = mongoose.model('user',userSchema);