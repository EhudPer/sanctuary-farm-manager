import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAnimalById,
  resetCurrentAnimal,
  updateAnimal
} from '../../actions/animalActions'
import {
  addAnimalImgToGcp,
  deleteAnimalImgFromGcp
} from '../../actions/gcpActions'
import { useHistory, useParams } from 'react-router-dom'
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Swal from 'sweetalert2'
import CssModule from './AnimalEdit.module.css'
import moment from 'moment'

import catImg from '../../assets/cat.jpg'
import dogImg from '../../assets/dog.jpg'
import pigImg from '../../assets/pig.jpg'
import cowImg from '../../assets/cow.jpg'
import horseImg from '../../assets/horse.jpg'
import donkeyImg from '../../assets/donkey.jpg'

const AnimalEdit = () => {
  const [animalTypes] = useState([
    'Cat',
    'Dog',
    'Pig',
    'Cow',
    'Horse',
    'Donkey'
  ])

  const history = useHistory()
  const dispatch = useDispatch()
  const animal = useSelector(state => state.animal.currentAnimal)

  const [isDropdownOpen, setIsDropDownOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState('')
  const [isUploadDisabled, setisUploadDisabled] = useState(true)
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

  const animalTypesJsx = animalTypes.map((type, index) => {
    return (
      <DropdownItem onClick={changeDropdownValue} key={index}>
        {type}
      </DropdownItem>
    )
  })

  useEffect(() => {
    dispatch(getAnimalById(id))
    return () => {
      dispatch(resetCurrentAnimal())
    }
  }, [])

  useEffect(() => {
    if (animal) {
      setDropdownValue(animal.type)
    }
  }, [animal])

  function onAnimalListClick() {
    history.push('/animals')
  }

  function toggleDropdown() {
    setIsDropDownOpen(!isDropdownOpen)
  }

  function changeDropdownValue(e) {
    setDropdownValue(e.currentTarget.textContent)
  }

  function toggleIsUploadDisabled() {
    setisUploadDisabled(!isUploadDisabled)
  }

  async function onSubmit(event) {
    event.preventDefault()

    const data = new FormData(document.getElementById('edit-form'))

    if (data.get('animalName') === '') {
      return Swal.fire({
        title: 'Animal name CANNOT be empty!',
        icon: 'warning',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'orange'
      })
    }

    let animalImgPublicUrl = null

    const keepCurrentImg = data.get('keepCurrentImg')

    if (keepCurrentImg) {
      animalImgPublicUrl = animal.image_public_url
    } else {
      if (animal.image_public_url) {
        const imgName = animal.image_public_url.substring(
          animal.image_public_url.lastIndexOf('/') + 1
        )

        const deleteAnimalImgFromGcpRes = await dispatch(
          deleteAnimalImgFromGcp(imgName)
        )

        if (deleteAnimalImgFromGcpRes.status !== 200) {
          return Swal.fire({
            title: 'Animal was not updated!',
            text: `Please try updating ${animal.name} later...`,
            icon: 'error'
          })
        }
      }

      const animalImg = data.get('animalImg')

      if (animalImg.name !== '') {
        const addAnimalImgToGcpRes = await dispatch(
          addAnimalImgToGcp(animalImg)
        )
        animalImgPublicUrl = addAnimalImgToGcpRes.data
      }
    }

    const animalToUpdate = {
      _id: id,
      name: data.get('animalName'),
      type: dropdownValue,
      imgPublicUrl: animalImgPublicUrl,
      dateOfBirth:
        data.get('animalDateOfBirth') !== ''
          ? data.get('animalDateOfBirth')
          : null
    }

    const updatedAnimalRes = await dispatch(updateAnimal(animalToUpdate))
    const updatedAnimalStatus = updatedAnimalRes.payload.status

    Swal.fire({
      title:
        updatedAnimalStatus === 200
          ? 'Animal Updated Successfully!'
          : 'Animal NOT Updated Successfully!',
      text:
        updatedAnimalStatus === 200 ? '' : 'Please try again at a later time..',
      icon: updatedAnimalStatus === 200 ? 'success' : 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: updatedAnimalStatus === 200 ? 'green' : 'red'
    })

    if (updatedAnimalStatus === 200) {
      history.push(`/animal/${id}`)
    }
  }

  return (
    <Container className={CssModule.container}>
      <div className={CssModule['header-and-button']}>
        <h4>Update Animal</h4>
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
          <div className={CssModule['form-container']}>
            <Form id="edit-form" className={CssModule.form}>
              <FormGroup>
                <Label for="animalName">Animal Name</Label>
                <Input
                  type="text"
                  name="animalName"
                  id="name"
                  defaultValue={animal.name}
                  placeholder="Animal name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="animalType">Animal Type</Label>
                <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>{dropdownValue}</DropdownToggle>
                  <DropdownMenu>{animalTypesJsx}</DropdownMenu>
                </Dropdown>
              </FormGroup>
              <FormGroup>
                <Label for="animalImg">Animal Image</Label>
                <Input
                  type="file"
                  name="animalImg"
                  id="animalImg"
                  disabled={isUploadDisabled}
                />
                <FormText color="muted">
                  Choose a file for the animal's image from your computer.
                </FormText>
              </FormGroup>
              <FormGroup check>
                <Label for="keepCurrentImg" check>
                  <Input
                    onChange={() => {
                      toggleIsUploadDisabled()
                    }}
                    type="checkbox"
                    name="keepCurrentImg"
                    id="keepCurrentImg"
                    defaultChecked
                  />{' '}
                  Keep Current Image
                </Label>
              </FormGroup>
              <br />
              <FormGroup>
                <Label for="animalDateOfBirth">Animal Date Of Birth</Label>
                <Input
                  type="date"
                  name="animalDateOfBirth"
                  id="animalDateOfBirth"
                  defaultValue={
                    animal.date_of_birth
                      ? moment(animal.date_of_birth).format('YYYY-MM-DD')
                      : null
                  }
                />
              </FormGroup>
              <div className={CssModule['form-btns-container']}>
                <Button
                  form="edit-form"
                  type="submit"
                  color="primary"
                  onClick={onSubmit}
                >
                  Update
                </Button>{' '}
                <Button
                  color="secondary"
                  onClick={() => {
                    onAnimalListClick()
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
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

export default AnimalEdit
