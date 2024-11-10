//components/approvalItem

import React from "react";

const ApprovalItem = ({ listing, onApprove, onDelete }) => {
  return (
    <div className="approval-card">
      <div className="card-content">
        <h3>Employee: {listing.employeeName}</h3>
        <p>
          <strong>Leave Type:</strong> {listing.leaveType}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(listing.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(listing.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Reason:</strong> {listing.reason}
        </p>
      </div>
      <div className="card-actions">
        <button
          className="approve-button"
          onClick={() => onApprove(listing._id)}
        >
          Approve
        </button>
        <button className="delete-button" onClick={() => onDelete(listing._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApprovalItem;
