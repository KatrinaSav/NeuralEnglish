import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './SidePannel.css';
import './SidePannelCollection.css';
import CollectionButton from './CollectionButton';
import { setCurrentCollectionAction } from '../store/CurrentCollectionReducer';
import { getCollections } from '../store/CollectionReducer'

const SidePannelCollection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userId)
  const collections = useSelector((state) => state.collections.collections);
  const currentCollectionId = useSelector((state) => state.currentCollection.id);
  console.log("cuuuuur", currentCollectionId)

  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCollectionClick = (collection) => {
    console.log('handleCollectionClick')
    console.log('collection', collection)
    dispatch(setCurrentCollectionAction(collection.id, collection.name));
  };

  const handleAddCollection = () => {
    setIsAddingCollection(true);
  };

  const handleCreateCollection = async () => {


    try {
        // Отправить данные на сервер для создания новой коллекции
        const response = await fetch(`http://localhost:8000/addCollection/${user}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newCollectionName }),
        });
    
        if (response.ok) {
          dispatch(getCollections(user))
          // Коллекция успешно создана
          console.log('New collection created successfully!');
          // Дополнительные действия, если нужно
        } else {
          console.error('Failed to create new collection');
          // Обработка ошибки, если не удалось создать коллекцию
        }
      } catch (error) {
        console.error('Error creating new collection:', error);
        // Обработка ошибки, если произошла ошибка при выполнении запроса
      }



    console.log('Creating new collection:', newCollectionName);

    // Закончить добавление коллекции
    setIsAddingCollection(false);
    setNewCollectionName('');

    // Здесь вы можете выполнить дополнительные действия, например, закрыть окно
  };

  const handleCancelAddCollection = () => {
    setIsAddingCollection(false);
    setNewCollectionName('');
  };

  const column = collections.map((collection) => (
    <CollectionButton
      key={collection.id}
      collection={collection}
      active={collection.id === currentCollectionId}
      onClick={handleCollectionClick}
    />
  ));


  return (
    <div className="sidePannel">
      <h3 className="yourArticles">Your collections</h3>
      {column}
      {isAddingCollection ? (
        <div className="add-collection-form">
          <input
            type="text"
            placeholder="Enter collection name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
          <button onClick={handleCreateCollection}>Create</button>
          <button className="cancel" onClick={handleCancelAddCollection}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="addCollectionIcon" onClick={handleAddCollection}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      )}
    </div>
  );
};

export default SidePannelCollection;
