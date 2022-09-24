const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("./config/db");

const app = express();
app.use(express.json);


 app.get("/",(req,res)=>{
    res.send("Hello there..")
 });


app.listen(process.env.port || 3000);
