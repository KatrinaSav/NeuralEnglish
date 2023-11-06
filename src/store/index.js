import { combineReducers } from 'redux'
import { UserReducer } from './UserReducer'
import { ArticlesReducer } from './ArticlesReducer'
import { configureStore } from '@reduxjs/toolkit'
import { CurrentArticlesReducer } from './CurrentArticleReducer'

const rootReducer = combineReducers({
  user: UserReducer,
  articles: ArticlesReducer,
  currentArticle: CurrentArticlesReducer,
})
const store = configureStore({ reducer: rootReducer })
export { store }
