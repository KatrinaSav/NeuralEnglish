const initialState = { userId: -1 }
const SET_USER_ID = 'SET_USER_ID'

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.userId }
    default:
      return state
  }
}

export const setUserId = (userId) => ({
  type: SET_USER_ID, 
  userId,
})