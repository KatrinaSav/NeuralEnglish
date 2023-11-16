const initialState = { articles: [] }
const ADD_ARTICLE = 'ADD_ARTICLE'
const GET_ARTICLE = 'GET_ARTICLE'
const UPDATE_PROGRESS = 'UPDATE_PROGRESS'
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
    case UPDATE_PROGRESS: {
      let newArticles = state.articles.map((el) => {
        if (el.id === action.articleId)
          return { ...el, progress: action.progress }
        else return el
      })
      return { ...state, articles: newArticles }
    }

    default:
      return state
  }
}
export const addArticleAction = (article) => ({ type: ADD_ARTICLE, article })
export const getArticleAction = (userId) => ({ type: GET_ARTICLE, userId })
export const updateArticleProgressAction = (progress, articleId) => ({
  type: UPDATE_PROGRESS,
  progress,
  articleId,
})
