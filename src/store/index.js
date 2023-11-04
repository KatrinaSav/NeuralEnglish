import { combineReducers } from 'redux'
import { UserReducer } from './UserReducer'
import { ArticlesReducer } from './ArticlesReducer'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  user: UserReducer,
  articles: ArticlesReducer,
})
const store = configureStore({ reducer: rootReducer })
export { store }
