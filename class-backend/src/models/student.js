const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const studentSchema=new mongoose.Schema({
    studentName:{
        type:String
    },
    dob:{
        type:Number
    },
    gender:{
        type:String
    },
    class:{
        type:String
    },
    deleteFlag:{
        type:Boolean
    }
},{
    timestamps:true,
    collection:"student"
})

const student=mongoose.model("student",studentSchema)

module.exports=student