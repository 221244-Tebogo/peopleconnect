// // BACKEND/SERVER.JS
// backend/server.js
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "hr-connect",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const dotenv = require("dotenv");
// const express = require("express");
// const mongoose = require("mongoose");
// const authRoutes = require("./middleware/auth");
// const path = require("path");
// const cors = require("cors");

// // Import routes with updated names
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

// // Mongo Database connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     dbName: "hr-connect",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Routes setup
// app.use("/api/auth", require("./middleware/auth"));
// app.use("/api/employees", require("./routes/employee"));
// app.use("/api/announcements", require("./routes/announcement"));
// app.use("/api/careers", require("./routes/career"));
// // app.use("/api/auth", authRoutes);
// // app.use("/api/users", userRoutes);
// // app.use("/api/posts", postRoutes);
// // app.use("/api/announcements", announcementRoutes);
// // app.use("/api/careers", careerRoutes);
// // app.use("/api/employees", employeeRoutes);
// // app.use("/api/trainings", trainingRoutes);
// // app.use("/api/leaves", leaveRoutes);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

//BACKUP CODE SERVER
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const path = require("path");
// const cors = require("cors");

// // Import routes
// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const announcementRoutes = require("./routes/announcementRoutes");
// const careerRoutes = require("./routes/careerRoutes");
// const employeeRoutes = require("./routes/employeeRoutes");
// const trainingRoutes = require("./routes/trainingRoutes");
// const leaveRoutes = require("./routes/leaveRoutes");

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware setup
// app.use(cors());
// app.use(bodyParser.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes setup
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/announcements", announcementRoutes);
// app.use("/api/careers", careerRoutes);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/trainings", trainingRoutes);
// app.use("/api/leaves", leaveRoutes);

// // Database connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     dbName: "hr-connect",
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
