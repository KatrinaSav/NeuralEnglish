import { combineReducers } from 'redux'
import { UserReducer } from './UserReducer'
import { ArticlesReducer } from './ArticlesReducer'
import { configureStore } from '@reduxjs/toolkit'
import { CurrentArticlesReducer } from './CurrentArticleReducer'
import { WordInfoReducer } from './WordInfoReducer'

const rootReducer = combineReducers({
  user: UserReducer,
  articles: ArticlesReducer,
  currentArticle: CurrentArticlesReducer,
  wordInfo: WordInfoReducer,
})
const store = configureStore({ reducer: rootReducer })
export { store }
