const mongoose = require('mongoose');

const activitySchema = new  mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
    required: true
  },
  name: {type: String, required: true},
  action: { type: String, required: true },  
  details: { type: String },
  timestamp: { type: Date, default: Date.now }  
 
});



module.exports = mongoose.model('Activity', activitySchema);