import { useState, useEffect } from "react";
import nextId from 'react-id-generator';

const AddCard = ({ onInputListUpdate, onCancel }) => {
  const [input, setInput] = useState({
    status: "On Hold"
  });

  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    status: "",
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    if (name === "title") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: "Title is required",
        }));
      } else if (value.length > 250) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: "Title must be less than 250 characters",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: "",
        }));
      }
    }
  
    if (name === "desc") {
      if (value.length > 500) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          desc: "Description must be less than 500 characters",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          desc: "",
        }));
      }
    }
  
    if (name === "status") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          status: "Status is required",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          status: "",
        }));
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }
    
    const newInput = { ...input, id:nextId('PIP-')}
    onInputListUpdate((prevInputList) => [...prevInputList, newInput]);
    setInput({ title: "", desc: "", status: "On Hold" });
};

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div className="add-card">
        <h1>Add Task</h1>
        <form onSubmit={submitHandler}>
            <label>
                Enter Title:
                </label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={input.title || ""}
            onChange={inputHandler}
          />
          {errors.title && <p className="error">{errors.title}</p>}
          <label>
            Enter Description: 
          </label>
          <input
            name="desc"
            type="text"
            placeholder="Description"
            value={input.desc || ""}
            onChange={inputHandler}
          />
          {errors.desc && <p className="error">{errors.desc}</p>}
          <label>
            Select State
          </label>
          <select name="status" value={input.status} onChange={inputHandler}>
            <option value="On Hold">On Hold</option>
            <option value="To Do">To Do</option>
            <option value="In Dev">In Dev</option>
            <option value="Code Review">Code Review</option>
            <option value="Dev Complete">Dev Complete</option>
            <option value="In QA">In QA</option>
            <option value="QA Done">QA Done</option>
          </select>
          {errors.status && <p className="error">{errors.status}</p>}
          <button type="submit">Create</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default AddCard;
