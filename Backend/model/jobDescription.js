const mongoose = require('mongoose');
const JobDescriptionSchema = new mongoose.Schema({
  position:{
   type: String,
   required : true,
  },
  job_location: {
    type: String,
    required: true,
  },
  job_Id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requiredSkills: [{
    type:[String],
    required: true, 
  }],
  recruiter_name:{
    type:String,
    required: true,
  },
  recruiter_email:{
    type:String,
    required: true,
  },
  
  mapped: {
    type: Boolean,
    default: false,
  },

  matchedEmployees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  }],
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
  },

});

const Jobdesc = mongoose.model('JobDescription', JobDescriptionSchema);
module.exports = Jobdesc;
