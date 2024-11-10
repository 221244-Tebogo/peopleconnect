// // // BACKEND/SERVER.JS with adding training
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./middleware/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const announcementRoutes = require("./routes/announcement");
const careerRoutes = require("./routes/career");
const employeeRoutes = require("./routes/employee");
const trainingRoutes = require("./routes/training");
const leaveRoutes = require("./routes/leave");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// MongoDB Connection - Updated to remove deprecated options
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "hr-connect",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route setups
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/leaves", leaveRoutes);

// Static file serving (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// // backend/server.js
// const dotenv = require("dotenv");
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// // Import routes with updated names
// const authRoutes = require("./middleware/auth");
// const userRoutes = require("./routes/user");
// const postRoutes = require("./routes/post");
// const announcementRoutes = require("./routes/announcement");
// const careerRoutes = require("./routes/career");
// const employeeRoutes = require("./routes/employee");
// const trainingRoutes = require("./routes/training");
// const leaveRoutes = require("./routes/leave");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware setup
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     dbName: "hr-connect",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Route setups
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/announcements", announcementRoutes);
// app.use("/api/careers", careerRoutes);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/trainings", trainingRoutes);
// app.use("/api/leaves", leaveRoutes);

// // Static file serving (uploads)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
