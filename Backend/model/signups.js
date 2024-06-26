const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin","LC","RM","HR"],
    default: "admin",
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
});

signupSchema.pre("save", function (next) {
  if (this.isModified("role")) {
    this.status = this.role === "admin" ? 1 : 0;
  }
  next();
});

const userModel = mongoose.model("signups", signupSchema);
module.exports = userModel;