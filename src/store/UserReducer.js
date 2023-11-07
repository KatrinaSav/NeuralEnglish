const initialState = { userId: 1 }
const LOGIN = 'LOGIN'
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userId: action.id }
    case 'GET':
      return { ...state }
    default:
      return state
  }
}

export const loginUserAction = (id) => ({ type: LOGIN, id })
