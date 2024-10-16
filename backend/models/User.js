const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Employee", "Manager", "HR"], required: true },
  leaveBalance: { type: Number, default: 20 }, // Example default leave balance
});

module.exports = mongoose.model("User", userSchema);
