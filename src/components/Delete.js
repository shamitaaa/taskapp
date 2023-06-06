import React from 'react'

const Delete = (task, onDelete) => {

    // const handleDelete = () => {
    //     onDelete(task.id);
    // };

    return (
        <div className="card" key={task.id}>
            <h2>ID: {task.id}</h2>
            <p>Title: {task.title}</p>
            <p>Description: {task.desc}</p>
            <p>State: {task.status}</p>
        </div>

    )
}

export default Delete;