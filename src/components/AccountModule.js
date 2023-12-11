import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollections } from '../store/CollectionReducer';
import SidePannelCollection from './SidePannelCollection';
import ModsPannel from './ModsPannel';
import CardsPannel from './CardsPannel';

const AccountModule = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userId);
  const currCollectionId = useSelector((state) => state.currentCollection.id);
  const currCollectionName = useSelector((state) => state.currentCollection.name);

  useEffect(() => {
    dispatch(getCollections(user));
  }, [user, currCollectionId, dispatch, currCollectionName ]);

  return (
    <div>
      <div className="readingPage">
        <div className="side">
          <SidePannelCollection />
        </div>
        <div className="cards">
          {currCollectionId !== -1 ? (
            <CardsPannel collectionName={currCollectionName}  />
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
