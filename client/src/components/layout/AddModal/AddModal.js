import React from 'react'
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
import CssModule from './AddModal.module.css'
import { PromiseProvider } from 'mongoose'

const AddModal = props => {
  const animalTypesJsx = props.animalTypes.map((type, index) => {
    return (
      <DropdownItem onClick={props.changeDropdownValue} key={index}>
        {type}
      </DropdownItem>
    )
  })

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle} className="Modal">
        <ModalHeader toggle={props.toggle}>Add Animal</ModalHeader>
        <ModalBody>
          <Form id="add-form" onSubmit={props.submit}>
            <FormGroup>
              <Label for="animalName">Animal Name</Label>
              <Input
                type="text"
                name="animalName"
                id="name"
                placeholder="Add the new animal name "
                maxLength="10"
              />
            </FormGroup>
            <FormGroup>
              <Label for="animalType">Animal Type</Label>
              <Dropdown
                isOpen={props.dropdownOpen}
                toggle={props.toggleDropdown}
              >
                <DropdownToggle caret>{props.dropdownValue}</DropdownToggle>
                <DropdownMenu>{animalTypesJsx}</DropdownMenu>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label for="animalImg">Animal Image</Label>
              <Input type="file" name="animalImg" id="animalImg" />
              <FormText color="muted">
                Choose a file for the animal's image from your computer.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="animalDateOfBirth">Animal Date Of Birth</Label>
              <Input
                type="date"
                name="animalDateOfBirth"
                id="animalDateOfBirth"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            form="add-form"
            type="submit"
            color="primary"
            onClick={props.submit}
          >
            Add
          </Button>{' '}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AddModal
