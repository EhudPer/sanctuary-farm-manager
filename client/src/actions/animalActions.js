import { GET_ANIMALS, ADD_ANIMAL, UPDATE_ANIMAL, DELETE_ANIMAL } from './types'
import axios from 'axios'

const url = 'api/animals/'

export const getAnimals = () => {
  return async dispatch => {
    dispatch({
      type: GET_ANIMALS,
      payload: await axios.get(url)
    })
  }
}

export const deleteAnimal = _id => {
  // return {
  //   type: DELETE_ANIMAL,
  //   payload: id
  // }
  console.log(`${url}${_id}`)

  return async dispatch => {
    await axios.delete(`${url}${_id}`)
    return dispatch({
      type: DELETE_ANIMAL,
      payload: _id
    })
  }
}

export const addAnimal = newAnimal => {
  // return {
  //   type: ADD_ANIMAL,
  //   payload: newAnimal
  // }
  return async dispatch => {
    return dispatch({
      type: ADD_ANIMAL,
      payload: await axios.post(url, newAnimal)
    })
  }
}
