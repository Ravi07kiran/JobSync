const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    unique: true,
    
  },
  experience: {
    type: Number,
    
  },
 
  tier: {
    type: Number,
    
  },
 
  // categorys: {
  //   type: String,
    
  // },
  // category_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "category",
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
  },
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;
