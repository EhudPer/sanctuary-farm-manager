import {
  GET_ANIMALS,
  GET_ANIMAL_BY_ID,
  ADD_ANIMAL,
  UPDATE_ANIMAL,
  DELETE_ANIMAL,
  RESET_CURRENT_ANIMAL
} from './types'
import axios from 'axios'

const url = '/api/animals/'

export const getAnimals = () => {
  return async dispatch => {
    dispatch({
      type: GET_ANIMALS,
      payload: await axios.get(url)
    })
  }
}

export const getAnimalById = _id => {
  return async dispatch => {
    dispatch({
      type: GET_ANIMAL_BY_ID,
      payload: await axios.get(`${url}${_id}`)
    })
  }
}

export const deleteAnimal = _id => {
  return async dispatch => {
    await axios.delete(`${url}${_id}`)
    return dispatch({
      type: DELETE_ANIMAL,
      payload: _id
    })
  }
}

export const addAnimal = newAnimal => {
  return async dispatch => {
    return dispatch({
      type: ADD_ANIMAL,
      payload: await axios.post(url, newAnimal)
    })
  }
}

export const resetCurrentAnimal = () => {
  return async dispatch => {
    return dispatch({
      type: RESET_CURRENT_ANIMAL,
      payload: null
    })
  }
}
