import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollections } from '../store/CollectionReducer';
import { getCards } from '../store/CardsReducer';
import SidePannelCollection from './SidePannelCollection';
import ModsPannel from './ModsPannel';
import CardsPannel from './CardsPannel';

const AccountModule = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userId);
  const currCollectionId = useSelector((state) => state.currentCollection.id);
  const currCollectionName = useSelector((state) => state.currentCollection.name);
  const cards = useSelector((state) => state.cards.cards);
  useEffect(() => {
    dispatch(getCollections(user));
    if (currCollectionId !== -1) {
      dispatch(getCards(currCollectionId));
    }
  }, [user, currCollectionId, dispatch]);

  return (
    <div>
      <div className="readingPage">
        <div className="side">
          <SidePannelCollection />
        </div>
        <div className="cards">
          {currCollectionId !== -1 ? (
            <CardsPannel collectionName={currCollectionName} cards={cards} />
          ) : (
            <span></span>
          )}
        </div>
        <div className="mods">
          <ModsPannel />
        </div>
      </div>
    </div>
  );
};

export default AccountModule;
