const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shiftSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  shiftTime: { type: String, required: true }, // e.g., "09:00-17:00"
  swapApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Shift", shiftSchema);
