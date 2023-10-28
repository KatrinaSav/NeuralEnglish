const initialState = { userId: 0 }

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userId: action.id }
    case 'GET':
      return { ...state }
    default:
      return state
  }
}
export { UserReducer }
