const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeid: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  tier: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  skills: {
    type: [{
      name: {
        type: String,
        required: true,
      },
      proficiency: {
        type: Number,
        min: 1,
        max: 3,
      },
    }],
  },
  location: {
    type: String,
    required: true,
  },
  mappedJobDescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobDescription", 
    default: null, 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
  },
  
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;
