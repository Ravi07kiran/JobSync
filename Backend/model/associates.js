const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    proficiency: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    }
});

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
    skills:[SkillSchema],
    mapped: {
        type: Boolean,
        default: false,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userRole",
    },
});

const Associate = mongoose.model("Associate",AssociateSchema);

module.exports = Associate;