import { useState } from "react";
import AddCard from "./AddData";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditTask from "./EditTask";
import '../index.css'

const Dashboard = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [inputList, setInputList] = useState([]);
    

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const toggleEditPopup = () => {
        setShowEditPopup(!showEditPopup);
    };


    const handleInputListUpdate = (newInputList) => {
        setInputList(newInputList);
    };

    const updateTask = (updatedTask) => {
        const updatedTaskIndex = inputList.findIndex((task) => task.id === updatedTask.id);
        if (updatedTaskIndex !== -1) {
          const updatedList = [...inputList];
          updatedList.splice(updatedTaskIndex, 1, updatedTask);
          setInputList(updatedList);
        }
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

                <div className="card-list">
                    {inputList.map((item) => (
                        <div className="card" key={item.id}>
                            <h2>ID: {item.id}</h2>
                            <p>Title: {item.title}</p>
                            <p>Description: {item.desc}</p>
                            <p>State: {item.status}</p>
                            
                            <div className="button-container">
                                <IconButton><DeleteIcon /></IconButton>
                                <IconButton onClick={toggleEditPopup}><EditIcon /></IconButton>
                                {showEditPopup && (
                                    <div className="popup-overlay">
                                        <div className="popup">
                                            <EditTask task={item} onEdit={updateTask} onCancel={toggleEditPopup} />
                                        </div>
                                    </div>
                                )}
                                <IconButton><VisibilityIcon /></IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
