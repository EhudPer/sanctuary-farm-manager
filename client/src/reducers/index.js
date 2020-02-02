import { combineReducers } from 'redux'
import AnimalReducer from './animalReducer'

export default combineReducers({
  animal: AnimalReducer
})
