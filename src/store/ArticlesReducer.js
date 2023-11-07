let test = []

await fetch('http://localhost:8000/articles/1')
  .then((response) => response.json())
  .then((json) => {
    for (let element in json) {
      test.push(json[element])
    }
  })
  .catch(console.log('Kek'))

const initialState = { articles: test }
const ADD_ARTICLE = 'ADD_ARTICLE'
const GET_ARTICLE = 'GET_ARTICLE'
export const ArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.article] }
    case GET_ARTICLE:
      return { ...state }
    default:
      return state
  }
}
export const addArticleAction = (article) => ({ type: ADD_ARTICLE, article })
export const getArticleAction = () => ({ type: GET_ARTICLE })
