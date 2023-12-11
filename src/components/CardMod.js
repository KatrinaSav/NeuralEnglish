import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchange, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './CardMod.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CardMod = () => {
  const cards = useSelector((state) => state.cards.cards);
  let navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isWord, setIsWord] = useState(true);
  const [isDone, setIsDone] = useState(true);

  const handleToggle = () => {
    setIsWord((prevIsWord) => !prevIsWord);
  };

  const handleReturn = () => {
    navigate('/account');
  };

  const handleLearning = async () => {
    try {
      
      const response = await fetch(`http://localhost:8000/sendRememberData/${cards[currentCardIndex].id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'learning' }),
      });
    } catch (error) {
      console.error('Error:', error);
    }
    showNextCard();
  };

  const handleKnow = async () => {
    try {
      
      const response = await fetch(`http://localhost:8000/sendRememberData/${cards[currentCardIndex].id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'know' }),
      });
    } catch (error) {
      console.error('Error:', error);
    }
    showNextCard();
  };

  const showNextCard = () => {
    // Переключаемся на следующую карточку, если она есть
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsDone(false);
    }
  };

  useEffect(() => {
    // Логика, которая выполняется при изменении текущей карточки
    // Здесь вы можете обновить любой другой контент на основе текущей карточки
  }, [currentCardIndex]);

  return (
    <div className="cardForCardMod">
      {isDone ? (
        <div className="contentCardMod">
          {isWord ? (
            <label className='cardNameMod'>{cards[currentCardIndex].name}</label>
          ) : (
            <label className='cardDef'>{cards[currentCardIndex].def}</label>
          )}
          <FontAwesomeIcon icon={faExchange} className="arrowIconCard" onClick={handleToggle} />
        </div>
      ) : (
        <div className="doneMessage">Done!</div>
      )}
      {isDone && (
        <div className='rememberButton'>
          <button className='learning' onClick={handleLearning}>
            Still learning
          </button>
          <button className='know' onClick={handleKnow}>
            Know
          </button>
        </div>
      )}
      <button className="deleteButton" onClick={handleReturn}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default CardMod;
