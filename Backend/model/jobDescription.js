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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
  },

});

const Jobdesc = mongoose.model('JobDescription', JobDescriptionSchema);
module.exports = Jobdesc;
