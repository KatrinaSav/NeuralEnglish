const initialState = { collections: [] };
const ADD_COLLECTION = 'ADD_COLLECTION';
const GET_COLLECTIONS = 'GET_COLLECTIONS';

export const CollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLLECTION:
      return { ...state, collections: [...state.collections, action.collection] };
    case GET_COLLECTIONS:
        
        let coll = []
        let request = new XMLHttpRequest()
        request.open(
          'GET',
          `http://localhost:8000/collections/${action.userId}`,
          false
        ) // `false` makes the request synchronous
        request.send(null)
  
        if (request.status === 200) {
          const arrayOfCollections = JSON.parse(request.responseText)
          for (let collection in arrayOfCollections) {
            coll.push(arrayOfCollections[collection])
          }
        }
      return { ...state, collections: coll };
    default:
      return state;
  }
};


export const addCollection = (collection) => ({
  type: ADD_COLLECTION,
  collection,
});

export const getCollections = (userId) => ({
  type: GET_COLLECTIONS,
  userId,
});
