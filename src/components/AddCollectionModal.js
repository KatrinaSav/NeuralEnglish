// Ваш файл AddCollectionModal.jsx
import React, { useState } from 'react';
import './AddCollectionModal.css';

const AddCollectionModal = ({ onClose, onAddCollection }) => {
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCreateCollection = () => {
    onAddCollection(newCollectionName);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New Collection</h2>
        <input
          type="text"
          placeholder="Enter collection name"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
        />
        <button onClick={handleCreateCollection}>Create</button>
      </div>
    </div>
  );
};

export default AddCollectionModal;
