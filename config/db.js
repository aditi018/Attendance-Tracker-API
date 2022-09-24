const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Attendance2",{
    useNewUrlParser:true,
}).then(()=>{
    console.log("connection successful...");
}).catch((err)=>{
    console.log(err);
});