import { useDispatch, useSelector } from "react-redux";
import { updateTaskEntries } from "../store/Actions";
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

    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [viewTask, setViewTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [inputList, setInputList] = useState([]);
    const [filteredInputList, setFilteredInputList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const toggleEditPopup = (task) => {
        setSelectedTask(task);
        setShowEditPopup(!showEditPopup);
    };

    const toggleViewPopup = (task) => {
        setShowViewPopup(!showViewPopup);
        setViewTask(task);
    };

    const handleInputListUpdate = (newInputList) => {
        setInputList(newInputList);
        setFilteredInputList(newInputList);
    };

    const updateTask = (updatedTask) => {
        const updatedTaskIndex = inputList.findIndex((task) => task.id === updatedTask.id);
       
        if (updatedTaskIndex !== -1) {
            const updatedList = [...inputList];
            updatedList.splice(updatedTaskIndex, 1, updatedTask);
            setInputList(updatedList);
            setFilteredInputList(updatedList);
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);

        if (searchTerm.trim() === "") {
            setFilteredInputList([]);
            return;
        }

        const filteredList = inputList.filter(
            (task) =>
                task.id.includes(searchTerm) ||
                task.title.includes(searchTerm) ||
                task.desc.includes(searchTerm) ||
                task.status.includes(searchTerm)
        );
        setFilteredInputList(filteredList);
    };

    const handleCancelSearch = () => {
        setSearchTerm("");
        setFilteredInputList([]);
    };

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
                            <AddCard onInputListUpdate={handleInputListUpdate} onCancel={togglePopup} />
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
