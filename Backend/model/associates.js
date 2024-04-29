const mongoose = require('mongoose');

const AssociateSchema =new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    employeeId:{
        type:Number,
        required:true,
        unique:true,
    },
    Email:{
        type:String,
        unique:true,
        required:true,
    },
    skills:{
        type:String,
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userRole",
    },
});

const Associate = mongoose.model("Associate",AssociateSchema);

module.exports = Associate;