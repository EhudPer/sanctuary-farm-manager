import axios from 'axios'
import { GET_ERRORS } from './types'

// Add animal's image to Google Cloud Platform
export const addAnimalImgToGcp = animalImgFile => dispatch => {
  const data = new FormData()
  data.append('image', animalImgFile)

  return axios
    .post('/api/index/upload', data)
    .then(res => res) // return added animal's image public url
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete animal's image from Google Cloud Platform
export const deleteAnimalImgFromGcp = animalImgName => dispatch => {
  return axios
    .delete('/api/index/delete-gcp-img', { data: { fileName: animalImgName } })
    .then(res => res)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
