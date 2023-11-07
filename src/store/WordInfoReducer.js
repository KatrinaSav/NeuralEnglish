const initialState = { word: 'example', function: 'Meaning' }

const SET_WORD = 'SET_WORD'
const SET_FUNCTION = 'SET_FUNCTION'
export const WordInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORD:
      return { ...state, word: action.word }
    case SET_FUNCTION:
      return { ...state, function: action.func }
    default:
      return state
  }
}
export const setWordInfoAction = (word) => ({
  type: SET_WORD,
  word,
})
export const setInfoFunctionAction = (func) => ({
  type: SET_FUNCTION,
  func,
})
