import { useState, useEffect } from "react";
import AddCard from "./AddData";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";
import Search from "./Search";
import '../index.css'

const Dashboard = () => {

    //get inputlist or empty array and assign to initialstate variable.
    const initialState = JSON.parse(localStorage.getItem("inputList")) || [];

    // const getCounterFromStorage = () => {
    //     const counter = localStorage.getItem("counter");
    //     return counter ? parseInt(counter) : 0;
    //   };

    //   const updateCounter = (newCounter) => {
    //     localStorage.setItem("counter", newCounter.toString());
    //     setCounter(newCounter);
    //   };

    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [viewTask, setViewTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [inputList, setInputList] = useState(initialState);
    const [filteredInputList, setFilteredInputList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [counter, setCounter] = useState(initialState.length);

    const updateCounter = (value) => {
      setCounter(value);
    };

    //add task pop up
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    //edit task pop up. sets value to task
    const toggleEditPopup = (task) => {
        setSelectedTask(task);
        setShowEditPopup(!showEditPopup);
    };

    //view task pop up. sets viewtask with task so later we can call viewtask as task cant be used
    const toggleViewPopup = (task) => {
        setShowViewPopup(!showViewPopup);
        setViewTask(task);
    };
    
    //persist values in browser local storage. inputlist to JSON format
    useEffect(() => {
      localStorage.setItem("inputList", JSON.stringify(inputList));
    },) 

    

      

    //used for search so that updated values will also show.
    const handleInputListUpdate = (newInputList) => {
        setInputList(newInputList);
        setFilteredInputList(newInputList);
    };

    //used with edit task. take updatedtask and set it to task with same id. delete original insert new into updatedlist
    //filterinputlist used for search to show updated values
    const updateTask = (updatedTask) => {
        const updatedTaskIndex = inputList.findIndex((task) => task.id === updatedTask.id);
       
        if (updatedTaskIndex !== -1) {
            const updatedList = [...inputList];
            updatedList.splice(updatedTaskIndex, 1, updatedTask);
            setInputList(updatedList);
            setFilteredInputList(updatedList);
        }
    };

    //used to find searchterm. filter tasks that include search term and set filtered list which will display relevant values.
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
      
        if (searchTerm.trim() === "") {
          setFilteredInputList(inputList);
          return;
        }
      
        const filteredList = inputList.filter((task) => {
          if (
            task &&
            task.id &&
            task.title &&
            task.desc &&
            task.status &&
            (task.id.includes(searchTerm) ||
              task.title.includes(searchTerm) ||
              task.desc.includes(searchTerm) ||
              task.status.includes(searchTerm))
          ) {
            return true;
          }
          return false;
        });
      
        setFilteredInputList(filteredList);
      }; 

    //cancel search and show all values. sets searchterm empty.
    const handleCancelSearch = () => {
        setSearchTerm("");
        setFilteredInputList([]);
    };

    //delete functionality. take task id, filter and give all values not equal to it
    const deleteTask = (id) => {
        const updatedList = inputList.filter((task) => task.id !== id);
        setInputList(updatedList);
        setFilteredInputList(updatedList);
      };

    return (
        <>
            <div className="dashboard">
                <h1>Dashboard</h1>

                <button className="blue-button" onClick={togglePopup}>Add Task</button>
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <AddCard onInputListUpdate={handleInputListUpdate} onCancel={togglePopup} counter={counter}
  updateCounter={updateCounter}/>
                        </div>
                    </div>
                )}

                <Search onSearch={handleSearch} onCancel={handleCancelSearch} />

                <div className="card-list">
                    {Array.isArray(inputList) && (
                        (searchTerm.trim() === "" ? inputList : filteredInputList).map((item) => (
                            <div className="card" key={item.id}>
                                <h2>ID: {item.id}</h2>
                                <p>Title: {item.title}</p>
                                <p>State: {item.status}</p>

                                <div className="button-container">
                                    <IconButton onClick={() => deleteTask(item.id)}><DeleteIcon /></IconButton>
                                    <IconButton onClick={() => toggleEditPopup(item)}><EditIcon /></IconButton>
                                    <IconButton task={item} onClick={() => toggleViewPopup(item)}><VisibilityIcon /></IconButton>
                                </div>
                            </div>
                        )))
                    }
                </div>

                {showEditPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <EditTask task={selectedTask} onEdit={updateTask} onCancel={toggleEditPopup} />
                        </div>
                    </div>
                )}

                {showViewPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <ViewTask task={viewTask} onCancel={toggleViewPopup} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
