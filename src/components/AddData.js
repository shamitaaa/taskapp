import { useState } from "react";

const AddCard = ({ onInputListUpdate, onCancel }) => {
  const [input, setInput] = useState({
    status: "On Hold"
  });

  const [counter, setCounter] = useState(1);

//   const updateCounter = () => {
//     setCounter(counter + 1)
// };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newInput = { ...input, id: `PIP-${counter}` };
    onInputListUpdate((prevInputList) => [...prevInputList, newInput]);
    setInput({ title: "", desc: "", status: "On Hold" });
    setCounter((prevCounter) => prevCounter + 1);
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
            maxLength={250}
          />
          <label>
            Enter Description: 
          </label>
          <input
            name="desc"
            type="text"
            placeholder="Description"
            value={input.desc || ""}
            onChange={inputHandler}
            maxLength={500}
          />
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
          <button type="submit">Create</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default AddCard;