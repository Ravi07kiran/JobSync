const mongoose=require('mongoose');

const  RecruiterinfoSchema= new mongoose.Schema({
    RecruiterName:{
        type:String,
        required:true,
    },
    RecruiterEmail:{
        type:String,
        required:true,
    }
});


const jdSchema=new mongoose.Schema({
    jobID:{
        type:String,
        required:true,
        unique:true,
    },
    description :{
        type:String,
        required:true,
    },
    jobType:{
            type: String,
            enum: ['External', 'Internal'],
            required: true
    },
    location:{
        type:String,
        required:true,
    },
    Recruiterinfo:[RecruiterinfoSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userRole",
    }

})


const jobD = mongoose.model("jobDescription", jdSchema);

module.exports=jobD;