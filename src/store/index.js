import { combineReducers } from 'redux'
import { UserReducer } from './UserReducer'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({ user: UserReducer })
const store = configureStore({ reducer: rootReducer })
export { store }
