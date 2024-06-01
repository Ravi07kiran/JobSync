const mongoose = require('mongoose');

const JobDescriptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requiredSkills: [{
    type: String,
    required: true,
  }],

});

const Jobdesc = mongoose.model('JobDescription', JobDescriptionSchema);
module.exports = Jobdesc;
