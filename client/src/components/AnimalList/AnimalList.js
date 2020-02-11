import React, { Component } from 'react'
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
import Swal from 'sweetalert2'
import './AnimalList.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  getAnimals,
  deleteAnimal,
  addAnimal
} from '../../actions/animalActions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class AnimalList extends Component {
  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentDidMount() {
    this.props.getAnimals()
    // this.props.fetchAnimals()
  }

  onDeleteClick = async (_id, animalName) => {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover ${animalName}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: 'red',
      cancelButtonText: 'No, keep it'
    })

    if (res.value) {
      this.props.deleteAnimal(_id)
    } else {
      return
    }
  }

  onSubmit = event => {
    event.preventDefault()

    const data = new FormData(document.getElementById('add-form'))

    const newAnimal = {
      // id: uuid(),
      name: data.get('animalName')
    }

    this.toggle()

    this.props.addAnimal(newAnimal)
  }

  // try = () => {
  //   this.props.history.push('/animals/add')
  // }

  render() {
    const { animals } = this.props.animal

    return (
      <Container>
        <div>
          <div className="header-and-button justify-content-between">
            <h4>Your farm animals</h4>
            <Button
              onClick={this.toggle}
              color="dark"
              style={{ marginBottom: '2rem' }}
            >
              Add Animal
            </Button>
          </div>
          <ListGroup>
            <TransitionGroup className="animal-list">
              {animals.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id, name)}
                    >
                      Delete
                    </Button>
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
          <div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="Modal"
            >
              <ModalHeader toggle={this.toggle}>Add Animal</ModalHeader>
              <ModalBody>
                {/* <label>Animal name:</label>
                <input type="text" style={{ marginLeft: '15px' }} /> */}

                <Form id="add-form" onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="animalName">Animal Name</Label>
                    <Input
                      type="text"
                      name="animalName"
                      id="name"
                      placeholder="Add the new animal name "
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  form="add-form"
                  type="submit"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  Add
                </Button>{' '}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </Container>
    )
  }
}

AnimalList.propTypes = {
  getAnimals: PropTypes.func.isRequired,
  // fetchAnimals: PropTypes.func.isRequired,
  animal: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  animal: state.animal
})

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchAnimals: () => {
//       dispatch(fetchAnimals())
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(List);
// export default compose(
//   withRouter,
//   connect(mapStateToProps, { getAnimals }, mapDispatchToProps)
// )(AnimalList)

// export default AnimalList
export default connect(
  mapStateToProps,
  // mapDispatchToProps,
  { getAnimals, deleteAnimal, addAnimal }
  // mapDispatchToProps
)(AnimalList)
