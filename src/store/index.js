import { combineReducers } from 'redux'
import { CounterReducer } from './ExampleReducer'

const rootReducer = combineReducers({ count: CounterReducer })
const store = configureStore({ reducer: rootReducer })
