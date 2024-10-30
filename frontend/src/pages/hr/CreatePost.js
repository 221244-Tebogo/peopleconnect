import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import HRSidebar from "../../components/sidebar/HRSidebar";
import "react-datepicker/dist/react-datepicker.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [pinned, setPinned] = useState(false);
  const [department, setDepartment] = useState("");
  const [goLiveDate, setGoLiveDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [expiryOption, setExpiryOption] = useState("never");

  const handlePostCreation = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      category,
      pinned,
      department,
      goLiveDate,
      expiryDate: expiryOption === "never" ? null : expiryDate,
    };

    try {
      await axios.post("/api/hr/posts", postData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <div className="form-container">
          <h2>Create New Post</h2>
          <form onSubmit={handlePostCreation}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Pinned</label>
              <select
                value={pinned}
                onChange={(e) => setPinned(e.target.value === "yes")}
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="Marketing">Marketing</option>
                <option value="Tables">Tables</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Security">Security</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Events">Events</option>
                <option value="Gaming">Gaming</option>
                <option value="Procurement">Procurement</option>
                <option value="Legal">Legal</option>
                <option value="Sales">Sales</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Training & Development">
                  Training & Development
                </option>
                <option value="Corporate Communications">
                  Corporate Communications
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Go Live Date</label>
              <DatePicker
                selected={goLiveDate}
                onChange={(date) => setGoLiveDate(date)}
                showTimeSelect
                dateFormat="Pp"
                required
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <select
                value={expiryOption}
                onChange={(e) => setExpiryOption(e.target.value)}
              >
                <option value="never">Never</option>
                <option value="setDate">Set a Date</option>
              </select>

              {expiryOption === "setDate" && (
                <DatePicker
                  selected={expiryDate}
                  onChange={(date) => setExpiryDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  required
                />
              )}
            </div>

            <button type="submit" className="submit-button">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
