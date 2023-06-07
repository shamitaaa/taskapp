import { useState } from "react";
import nextId from 'react-id-generator';

const AddCard = ({ onInputListUpdate, onCancel }) => {

  //set default status on hold
  const [input, setInput] = useState({
    status: "On Hold"
  });

  //get e.target.name and e.target.value. set previnput with name value pair
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
   }

  //called on submit. id generated here. insert newinput into prev list. resets initial to empty and on hold.
  const submitHandler = (event) => {
    event.preventDefault();

    const newInput = { ...input, id: nextId('PIP-') }
    onInputListUpdate((prevInputList) => [...prevInputList, newInput]);
    setInput({ title: "", desc: "", status: "On Hold" });
  };

  //discard changes
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
          {/* {errors.title && <p className="error">{errors.title}</p>} */}
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
          {/* {errors.desc && <p className="error">{errors.desc}</p>} */}
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
          {/* {errors.status && <p className="error">{errors.status}</p>} */}
          <button type="submit">Create</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default AddCard;
