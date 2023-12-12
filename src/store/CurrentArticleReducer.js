const initialState = {
  article: { id: 0 },
  page: 1,
  text: '',
  activeWord: -1,
}
const SET_ARTICLE = 'SET_ARTICLE'
const SET_PAGE = 'SET_PAGE'
const SET_TEXT = 'SET_TEXT'
const SET_ACTIVE_WORD = 'SET_ACTIVE_WORD'
export const CurrentArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return { ...state, article: action.article }
    case SET_PAGE: {
      let test
      let request = new XMLHttpRequest()
      request.open(
        'GET',
        `http://localhost:8000/article/${state.article.id}/${action.page}`,
        false
      ) // `false` makes the request synchronous
      request.send(null)

      if (request.status === 200) {
        const json = JSON.parse(request.responseText)
        test = json['0'].text
      }
      return { ...state, page: action.page, text: test }
    }

    case SET_TEXT:
      return { ...state, text: action.text }
    case SET_ACTIVE_WORD:
      return { ...state, activeWord: action.activeWord }
    default:
      return state
  }
}
export const setCurrentArticleAction = (article) => ({
  type: SET_ARTICLE,
  article,
})
export const setCurrentPageAction = (page) => ({
  type: SET_PAGE,
  page,
})
export const setCurrentTextAction = (text) => ({
  type: SET_TEXT,
  text,
})
export const setActiveWordAction = (activeWord) => ({
  type: SET_ACTIVE_WORD,
  activeWord,
})
