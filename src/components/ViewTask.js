import React from "react";

const ViewTask = ({ task, onCancel }) => {
  return (
    <div className="view-task">
      <h1>View Task</h1>
      <p>ID: {task.id}</p>
      <p>Title: {task.title}</p>
      <p>Description: {task.desc}</p>
      <p>Status: {task.status}</p>
      <button type="button" onClick={onCancel}>
        Close
      </button>
    </div>
  );
};

export default ViewTask;