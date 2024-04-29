const mongoose=require('mongoose');

const jdSchema=new mongoose.Schema({
    jobID:{
        type:String,
        required:true,
        unique:true,
    },
    title:{
        type: String,
        required:true,
    },
    description :{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userRole",
    }

})


const jobD = mongoose.model("jobDescription", jdSchema);

module.exports=jobD;