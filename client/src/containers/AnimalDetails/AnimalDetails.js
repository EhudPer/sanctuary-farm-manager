import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAnimalById, resetCurrentAnimal } from '../../actions/animalActions'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Button } from 'reactstrap'
import CssModule from './AnimalDetails.module.css'

import catImg from '../../assets/cat.jpg'
import dogImg from '../../assets/dog.jpg'
import pigImg from '../../assets/pig.jpg'
import cowImg from '../../assets/cow.jpg'
import horseImg from '../../assets/horse.jpg'
import donkeyImg from '../../assets/donkey.jpg'

const AnimalDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const animal = useSelector(state => state.animal.currentAnimal)
  const { id } = useParams()

  const animalImgStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    width: '100%',
    paddingTop: '54.166666666667%',
    height: '0',
    marginBottom: '20px'
  }

  useEffect(() => {
    dispatch(getAnimalById(id))
    return () => {
      dispatch(resetCurrentAnimal())
    }
  }, [])

  function onAnimalListClick() {
    history.push('/animals')
  }

  return (
    <Container className={CssModule.container}>
      <div className={CssModule['header-and-button']}>
        <h4>Animal Details</h4>
        <Button
          onClick={() => {
            onAnimalListClick()
          }}
          color="dark"
          style={{ marginBottom: '2rem' }}
        >
          Animal List
        </Button>
      </div>

      {animal ? (
        <div className={CssModule['content-container']}>
          <div
            style={{
              ...animalImgStyle,
              backgroundImage: `url(${
                animal.image_public_url
                  ? animal.image_public_url
                  : animal.type === 'Cat'
                  ? catImg
                  : animal.type === 'Dog'
                  ? dogImg
                  : animal.type === 'Pig'
                  ? pigImg
                  : animal.type === 'Cow'
                  ? cowImg
                  : animal.type === 'Horse'
                  ? horseImg
                  : animal.type === 'Donkey'
                  ? donkeyImg
                  : null
              })`
            }}
          ></div>
          <div className={CssModule.details}>
            {/* <div className={CssModule['pair-container']}> */}
            <div>
              Animal Name: <span>{' ' + animal.name}</span>
            </div>
            <div>
              Animal Type: <span>{' ' + animal.type}</span>
            </div>
            {/* </div> */}
            {/* <div className={CssModule['pair-container']}>
              <div>
                Animal Name: <span>{' ' + animal.name}</span>
              </div>
              <div>
                Animal Type: <span>{' ' + animal.type}</span>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        <div className={CssModule.loading}>
          <p>Lodaing please wait...</p>
        </div>
      )}
    </Container>
  )
}

export default AnimalDetails
