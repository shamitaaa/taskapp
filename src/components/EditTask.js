import React, { useState } from 'react';

const EditInput = () => {
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input type="text" value={value} onChange={handleInputChange} />
      ) : (
        <span>{value}</span>
      )}
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default EditInput;
