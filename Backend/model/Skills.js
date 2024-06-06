const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true 
  },
  label: {
    type: String,
    required: true
  }
});

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;
