import { combineReducers } from 'redux'
import { UserReducer } from './UserReducer'
import { ArticlesReducer } from './ArticlesReducer'
import { CollectionReducer } from './CollectionReducer'
import { configureStore } from '@reduxjs/toolkit'
import { CurrentArticlesReducer } from './CurrentArticleReducer'
import { WordInfoReducer } from './WordInfoReducer'
import { CurrentCollectionReducer } from './CurrentCollectionReducer'
import { CardsReducer } from './CardsReducer'
import { CurrentQuestionArticleReducer } from './CurrentQuestionArticleReducer' 


const rootReducer = combineReducers({
  user: UserReducer,
  articles: ArticlesReducer,
  currentArticle: CurrentArticlesReducer,
  wordInfo: WordInfoReducer,
  collections: CollectionReducer,
  currentCollection: CurrentCollectionReducer,
  cards: CardsReducer,
  questionArticle: CurrentQuestionArticleReducer,
})
const store = configureStore({ reducer: rootReducer })
export { store }
