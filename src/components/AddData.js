import { useState } from "react";
import '../index.css';

const AddCard = ({ onInputListUpdate, onCancel, counter, updateCounter }) => {

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

    const newInput = { ...input, id: `PIP-${counter + 1}` };
    onInputListUpdate((prevInputList) => [...prevInputList, newInput]);
    setInput({ title: "", desc: "", status: "On Hold" });
    updateCounter(counter + 1);
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
            required
            name="title"
            type="text"
            placeholder="Title"
            maxLength={250}
            value={input.title || ""}
            onChange={inputHandler}
          />

          <label>
            Enter Description:
          </label>
          {/* <input
            required
            name="desc"
            type="text"
            placeholder="Description"
            maxLength={500}
            value={input.desc || ""}
            onChange={inputHandler}
          /> */}
          <textarea required name="desc" placeholder="Description" maxLength={500} value={input.desc || ""} onChange={inputHandler} rows="9" cols="70" />

          <label>
            Select State
          </label>
          <select required name="status" value={input.status} onChange={inputHandler}>
            <option value="On Hold">On Hold</option>
            <option value="To Do">To Do</option>
            <option value="In Dev">In Dev</option>
            <option value="Code Review">Code Review</option>
            <option value="Dev Complete">Dev Complete</option>
            <option value="In QA">In QA</option>
            <option value="QA Done">QA Done</option>
          </select>

          <button type="submit">Create</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default AddCard;
