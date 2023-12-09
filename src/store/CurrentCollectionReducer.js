const initialState = {
    id: -1 ,
    name: ''
  }
  const SET_COLLECTION = 'SET_COLLECTION'


  export const CurrentCollectionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_COLLECTION:
        console.log("SET_COLLECTION", action)
        return { ...state, id: action.id, name: action.name }
      default:
        return state
    }
  }

  export const setCurrentCollectionAction = (id, name) => ({
    type: SET_COLLECTION,
    id,
    name,
  })