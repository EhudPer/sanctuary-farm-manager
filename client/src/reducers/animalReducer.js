import {
  GET_ANIMALS,
  ADD_ANIMAL,
  UPDATE_ANIMAL,
  DELETE_ANIMAL
} from '../actions/types'
// import axios from 'axios'
// import uuid from 'uuid'

// const initialState = {
//   animals: [
//     { id: uuid(), name: 'An1' },
//     { id: uuid(), name: 'An2' },
//     { id: uuid(), name: 'An3' },
//     { id: uuid(), name: 'An4FA' }
//   ]
// }

const initialState = {
  animals: []
}

// function getAnimalsData() {
//   return new Promise((resolve, reject) => {
//     // if (Auth.loggedIn()) {
//     axios
//       .get('/api/animals/')
//       .then(res => {
//         return resolve(res.data)
//       })
//       .catch(err => reject(err))
//     // } else {
//     //   resolve(' ');
//     // }
//   })
// }

// getAnimalsData().then(function(animalsData) {
//   initialState.animals = animalsData
//   console.log(initialState.animals)
// })

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

//export const getAnimals = state => state.animals;
// export const animals = initialState.animals;

// export default (state = initialState, action) => {
//     return {
//       ...state
//     }
// }

// export const getAnimals = () => {
//   return fetchAnimals().then(res => {
//     // initialState.animals = res.data
//     console.log(res.data)
//     return res.data
//   })
// }
