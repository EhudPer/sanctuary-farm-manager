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
          {/* <label>Animal name:</label>
                <input type="text" style={{ marginLeft: '15px' }} /> */}

          <Form id="add-form" onSubmit={props.submit}>
            <FormGroup>
              <Label for="animalName">Animal Name</Label>
              <Input
                type="text"
                name="animalName"
                id="name"
                placeholder="Add the new animal name "
              />
            </FormGroup>
            <FormGroup>
              <Label for="animalType">Animal Type</Label>
              <Dropdown
                isOpen={props.dropdownOpen}
                toggle={props.toggleDropdown}
              >
                <DropdownToggle caret>{props.dropdownValue}</DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem header>Type</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={props.changeDropdownValue}>
                    Cat
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Dog</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Pig</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Cow</DropdownItem> */}
                  {animalTypesJsx}
                </DropdownMenu>
              </Dropdown>
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
