import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './Card'; 
import './CardsPannel.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCollections } from '../store/CollectionReducer'
import { getCards } from '../store/CardsReducer';


const CardsPannel = ({ collectionName, cards }) => {
    const currentCollectionId = useSelector((state) => state.currentCollection.id);
    const user = useSelector((state) => state.user.userId)
    const [startIndex, setStartIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardData, setNewCardData] = useState({
    title: '',
    content: '',
  });

    const visibleCards = cards.slice(startIndex, startIndex + 2);
  console.log('visibleCards',visibleCards)
    const dispatch = useDispatch();


    const handleArrowClick = (direction) => {
        if (direction === 'left') {
            setStartIndex((prevIndex) => Math.max(prevIndex - 2, 0));
        } else {
            setStartIndex((prevIndex) => prevIndex + 2);
        }
    };

    const handleEditCollection = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            // Отправить данные на сервер для редактирования коллекции
            const response = await fetch(`http://localhost:8000/editCollection/${currentCollectionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCollectionName }),
            });
    
            if (response.ok) {
                // Обновить данные коллекции и карт после успешного редактирования
                dispatch(getCollections(user));
                dispatch(getCards(currentCollectionId));
    
                // Скрыть форму редактирования
                setIsEditing(false);
            } else {
                console.error('Failed to edit collection');
            }
        } catch (error) {
            console.error('Error editing collection:', error);
        }
    };

    const handleCancelEdit = () => {
        // Отмена редактирования, скрываем форму редактирования
        setIsEditing(false);
    };

    const handleAddCard = () => {
        setIsAddingCard(true);
      };
    
      const handleSaveCard = async () => {
        try {
            // Отправить данные на сервер для редактирования коллекции
            const response = await fetch(`http://localhost:8000/addCard/${currentCollectionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word: newCardData.title, definition: newCardData.content}),
            });
    
            if (response.ok) {
                // Обновить данные коллекции и карт после успешного редактирования
                dispatch(getCollections(user));
                dispatch(getCards(currentCollectionId));
    
                // Скрыть форму редактирования
                setIsEditing(false);
            } else {
                console.error('Failed to add card');
            }
        } catch (error) {
            console.error('Error adding card:', error);
        }
        setIsAddingCard(false);
      };
    
      const handleCancelAddCard = () => {
        // Отмена добавления, скрываем форму добавления
        setIsAddingCard(false);
      };

    

    return (
        <div className="cardsPanel">
            <div className="header">
                <label>{collectionName}</label>           
                {isEditing ? (
                    <div className="editForm">
                        <input
                            type="text"
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            placeholder='Enter new name '
                        />
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) :
                (<FontAwesomeIcon icon={faEdit} className="editIcon" onClick={handleEditCollection} />)
            }
            </div>
            
            
            <div className="cardContainer">
                {startIndex > 0 && (
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="arrowIcon"
                        onClick={() => handleArrowClick('left')}
                    />
                )}
                <div className="two">
                    {visibleCards.map((card) => (
                        
                        <Card id={card.id} title={card.name} content={card.def} />
                    ))}
                </div>
                {startIndex + 2 < cards.length && (
                    <FontAwesomeIcon icon={faArrowRight} className="arrowIcon" onClick={() => handleArrowClick('right')} />
                )}
                <FontAwesomeIcon icon={faPlus} className="addIcon" onClick={handleAddCard}/>
            </div>
            {isAddingCard && (
        <div className="addCardForm">
          <label>Edit card form</label>
          <input
            type="text"
            value={newCardData.title}
            onChange={(e) => setNewCardData({ ...newCardData, title: e.target.value })}
            placeholder="Card Title"
          />
          <textarea
            value={newCardData.content}
            onChange={(e) => setNewCardData({ ...newCardData, content: e.target.value })}
            placeholder="Card Content"
          />
          <button onClick={handleSaveCard}>Create</button>
          <button onClick={handleCancelAddCard}>Cancel</button>
        </div>
      )}
        </div>
    );
};

export default CardsPannel;
