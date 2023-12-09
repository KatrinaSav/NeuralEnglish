// Ваш файл CollectionButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentCollectionAction } from '../store/CurrentCollectionReducer';
//import './CollectionButton.css'

const CollectionButton = ({ collection, active, onClick }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    onClick && onClick(collection);
    dispatch(setCurrentCollectionAction(collection.id, collection.name));
  };

  return (
    <div className="ArticleButton">
      <div className={active ? 'square activeSquare' : 'square'}></div>
      <button
        className="articleSide"
        key={collection.id}
        onClick={handleClick}
      >
        {collection.name}
      </button>
    </div>
  );
};

export default CollectionButton;
