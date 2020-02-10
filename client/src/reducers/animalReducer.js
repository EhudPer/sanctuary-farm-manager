import {
  GET_ANIMALS,
  ADD_ANIMAL,
  UPDATE_ANIMAL,
  DELETE_ANIMAL
} from '../actions/types'

const initialState = {
  animals: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ANIMALS:
      return {
        ...state,
        animals: action.payload.data
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
    default:
      return state
  }
}
