const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});

module.exports = mongoose.model("Manager", ManagerSchema);
