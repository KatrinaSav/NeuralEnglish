import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from '../store/CardsReducer';

const Card = ({ id, title, content }) => {
  const dispatch = useDispatch();
  const currentCollectionId = useSelector((state) => state.currentCollection.id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/deleteCard/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        dispatch(getCards(currentCollectionId));
      } else {
        console.error('Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/editCard/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: editedTitle, definition: editedContent }),
      });

      if (response.ok) {
        dispatch(getCards(currentCollectionId));
        setIsEditing(false);
      } else {
        console.error('Failed to edit card');
      }
    } catch (error) {
      console.error('Error editing card:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="topRightIcons">
        <FontAwesomeIcon icon={faEdit} className="editIcon" onClick={handleEditClick} />
        <FontAwesomeIcon icon={faTrashAlt} className="deleteIcon" onClick={handleDeleteClick} />
      </div>
      <div className="content">
        {isEditing ? (
          <div className="editCardForm">
            <label >Edit card form</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit Title"
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Edit Content"
            />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <>
            <label className="cardName">{title}</label>
            <label className="def">{content}</label>
            <div className="bottomCenterIcons">
        <FontAwesomeIcon icon={faVolumeUp} className="speakerIcon" />
      </div>
          </>
          
        )}
      </div>
      
    </div>
  );
};

export default Card;
