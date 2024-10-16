const express = require("express");
const router = express.Router();
const {
  createShift,
  viewShifts,
  approveShiftSwap,
} = require("../controllers/shiftController");
const { verifyManager, verifyEmployee } = require("../middleware/auth");

// Manager - Create shift
router.post("/create", verifyManager, createShift);

// Employee - View shifts
router.get("/my-shifts", verifyEmployee, viewShifts);

// Manager - Approve shift swap
router.put("/:id/approve-swap", verifyManager, approveShiftSwap);

module.exports = router;
