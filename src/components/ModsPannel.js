import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './ModsPannel.css'; 
import { setCurrentCollectionAction } from '../store/CurrentCollectionReducer';
import { getCollections } from '../store/CollectionReducer'
import { useNavigate } from 'react-router-dom';

const ModsPanel = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const cards = useSelector((state) => state.cards.cards);
    const user = useSelector((state) => state.user.userId)
    const currentCollectionId = useSelector((state) => state.currentCollection.id);

  // Предполагаем, что у вас есть список названий модов
  const modNames = ['Cards', 'Mod2', 'Mod3'];

  // Функция обработки клика по кнопке мода
  const handleModClick = (modName) => {
    if (modName === 'Cards'){
      if (currentCollectionId !== -1){
        navigate('/cardMod');
      }
    }



    console.log(`Clicked on mod: ${modName}`);
  };

  // Функция обработки клика по кнопке мусорки
  const handleDeleteClick = async () => {
    if (currentCollectionId !== -1) {
        console.log("del", currentCollectionId)
        const response = await fetch(`http://localhost:8000/deleteCollection/${currentCollectionId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: currentCollectionId }),
        });
        dispatch(setCurrentCollectionAction(-1, ''));
        
    console.log('Clicked on delete button');
    navigate('/account');

    }
  };

 

  return (
    <div>
    <div className="modsPanel">
      <label className="modsTitle">Study Mods</label>
      <div className="modButtons">
        {modNames.map((modName) => (
          <button
            key={modName}
            className="modButton"
            onClick={() => handleModClick(modName)}
          >
            {modName}
            <FontAwesomeIcon icon={faArrowRight} className="arrowIconMod" />
          </button>
        ))}
      </div>   
    </div>
            {/* Кнопка в виде иконки мусорки */}
      <button className="deleteButton" onClick={handleDeleteClick}>
        <FontAwesomeIcon icon={faTrashAlt}  />
      </button>
    </div>
  );
};

export default ModsPanel;
