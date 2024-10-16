const Shift = require("../models/Shift");

// Manager creates a shift
const createShift = async (req, res) => {
  const { date, shiftTime, employeeId } = req.body;

  try {
    const shift = new Shift({ date, shiftTime, employee: employeeId });
    await shift.save();
    res.status(201).json(shift);
  } catch (err) {
    res.status(500).json({ error: "Failed to create shift" });
  }
};

// Employee views their shifts
const viewShifts = async (req, res) => {
  try {
    const shifts = await Shift.find({ employee: req.user.id });
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shifts" });
  }
};

// Manager approves shift swap
const approveShiftSwap = async (req, res) => {
  const { id } = req.params;

  try {
    const shift = await Shift.findById(id);
    if (!shift) return res.status(404).json({ error: "Shift not found" });

    shift.swapApproved = true;
    await shift.save();
    res.json(shift);
  } catch (err) {
    res.status(500).json({ error: "Failed to approve shift swap" });
  }
};

module.exports = { createShift, viewShifts, approveShiftSwap };
