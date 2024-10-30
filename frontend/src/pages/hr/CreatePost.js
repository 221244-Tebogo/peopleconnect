import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import HRSidebar from "../../components/sidebar/HRSidebar";
import "react-datepicker/dist/react-datepicker.css";
import "./HRAdminDashboard.css"; // Custom CSS for cohesive styling

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
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <h2>
                  Create <b>New Post</b>
                </h2>
              </div>
              <div className="col-sm-6 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-success"
                  onClick={handlePostCreation}
                >
                  <i className="fa fa-plus"></i> <span>Create Post</span>
                </button>
              </div>
            </div>
          </div>

          <div className="form-container">
            <form onSubmit={handlePostCreation}>
              <div className="form-group mb-3">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Pinned</label>
                <select
                  className="form-control"
                  value={pinned}
                  onChange={(e) => setPinned(e.target.value === "yes")}
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label>Department</label>
                <select
                  className="form-control"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {/* List of departments here */}
                </select>
              </div>

              <div className="form-group mb-3">
                <label>Go Live Date</label>
                <DatePicker
                  selected={goLiveDate}
                  onChange={(date) => setGoLiveDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group mb-3">
                <label>Expiry Date</label>
                <select
                  className="form-control"
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
                    className="form-control mt-2"
                  />
                )}
              </div>

              <button type="submit" className="btn btn-success me-2">
                <i className="fa fa-save"></i> Save Post
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setTitle("");
                  setCategory("");
                  setPinned(false);
                  setDepartment("");
                  setGoLiveDate(null);
                  setExpiryDate(null);
                  setExpiryOption("never");
                }}
              >
                <i className="fa fa-times"></i> Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
