import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import animalReducer from './animalReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  animal: animalReducer
})
