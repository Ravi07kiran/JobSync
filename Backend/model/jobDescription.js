const mongoose = require('mongoose');
const JobDescriptionSchema = new mongoose.Schema({
  jdid:{
   type: String,
   required : true,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  location:{
    type:String,
    required: true,
  },

  requiredSkills: [{
    type: String,
    required: true,
  }],

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
