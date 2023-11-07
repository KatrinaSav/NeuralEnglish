const initialState = { articles: [] }
const ADD_ARTICLE = 'ADD_ARTICLE'
const GET_ARTICLE = 'GET_ARTICLE'
export const ArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.article] }
    case GET_ARTICLE: {
      let test = []
      let request = new XMLHttpRequest()
      request.open(
        'GET',
        `http://localhost:8000/articles/${action.userId}`,
        false
      ) // `false` makes the request synchronous
      request.send(null)

      if (request.status === 200) {
        const arrayOfArticles = JSON.parse(request.responseText)
        for (let article in arrayOfArticles) {
          test.push(arrayOfArticles[article])
        }
      }
      return { ...state, articles: test }
    }

    default:
      return state
  }
}
export const addArticleAction = (article) => ({ type: ADD_ARTICLE, article })
export const getArticleAction = (userId) => ({ type: GET_ARTICLE, userId })
