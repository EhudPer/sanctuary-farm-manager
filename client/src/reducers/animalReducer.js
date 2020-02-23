import {
  GET_ANIMALS,
  GET_ANIMAL_BY_ID,
  ADD_ANIMAL,
  UPDATE_ANIMAL,
  DELETE_ANIMAL,
  RESET_CURRENT_ANIMAL
} from '../actions/types'

const initialState = {
  animals: [],
  currentAnimal: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ANIMALS:
      return {
        ...state,
        animals: action.payload.data
      }
    case GET_ANIMAL_BY_ID:
      return {
        ...state,
        currentAnimal: action.payload.data
      }
    case ADD_ANIMAL:
      return {
        ...state,
        animals: [action.payload.data, ...state.animals]
      }
    case UPDATE_ANIMAL:
      return {
        ...state
      }
    case DELETE_ANIMAL:
      return {
        ...state,
        animals: state.animals.filter(animal => animal._id !== action.payload)
      }
    case RESET_CURRENT_ANIMAL:
      return {
        ...state,
        currentAnimal: action.payload
      }
    default:
      return state
  }
}
