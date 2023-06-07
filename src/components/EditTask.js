import React, { useState } from 'react';

const EditTask = ({ task, onEdit, onCancel }) => {
  
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  
  const handleInputChange = (e) => {
    
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(updatedTask); 
    onCancel(); 
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="edit-task">
      <h1>Edit Task</h1>
      <form>
        <label>Edit Title:</label>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
        />
        <label>Edit Description:</label>
        <input
          type="text"
          name="desc"
          onChange={handleInputChange}
        />
        <label>Edit State:</label>
        <select
          name="status"
          onChange={handleInputChange}
        >
          <option value="On Hold">On Hold</option>
          <option value="To Do">To Do</option>
          <option value="In Dev">In Dev</option>
          <option value="Code Review">Code Review</option>
          <option value="Dev Complete">Dev Complete</option>
          <option value="In QA">In QA</option>
          <option value="QA Done">QA Done</option>
        </select>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTask;
