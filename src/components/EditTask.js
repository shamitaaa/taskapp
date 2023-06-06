import React, { useState } from 'react';

const EditTask = ({ task, onEdit, onCancel }) => {
  
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [newTitle, setNewTitle] = useState(task?.title);
  const [newDesc, setNewDesc] = useState(task?.desc);
  const [newStatus, setNewStatus] = useState(task?.status);

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   if (name === 'title') {
  //     setNewTitle(value);
  //   } else if (name === 'desc') {
  //     setNewDesc(value);
  //   } else if (name === 'status') {
  //     setNewStatus(value);
  //   }
  // };

  // const saveChanges = () => {
  //   const updatedTask = {
  //     ...task,
  //     title: newTitle,
  //     desc: newDesc,
  //     status: newStatus
  //   };
  //   onEdit(updatedTask);
  // };

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
          value={newTitle}
          onChange={handleInputChange}
        />
        <label>Edit Description:</label>
        <input
          type="text"
          name="desc"
          value={newDesc}
          onChange={handleInputChange}
        />
        <label>Edit State:</label>
        <select
          name="status"
          value={newStatus}
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
