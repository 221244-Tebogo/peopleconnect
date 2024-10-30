exports.createLeaveRequest = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const newLeave = new SickLeave({
      employee: req.user.id,
      startDate,
      endDate,
      sickNote: "",
    });

    await newLeave.save();
    res
      .status(201)
      .json({ message: "Leave request created successfully", newLeave });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
