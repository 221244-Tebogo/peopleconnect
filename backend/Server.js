const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const leaveRoutes = require("./routes/leaveRoutes");
app.use("/api/leaves", leaveRoutes);
app.use("/api/employee", require("./routes/employeeRoutes"));

mongoose
  .connect(
    "mongodb+srv://221244:VLCzVYr1xhEDd4MR@hr-connect.9nbao.mongodb.net/hr-connect?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
