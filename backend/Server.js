const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const employeeRoutes = require("./routes/employeeRoutes");
const managerRoutes = require("./routes/managerRoutes");
const hrRoutes = require("./routes/hrRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/hr", hrRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://localhost/peopleconnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
