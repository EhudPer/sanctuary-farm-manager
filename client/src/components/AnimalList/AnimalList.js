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
  DropdownItem,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'
import Swal from 'sweetalert2'
import CssModule from './AnimalList.module.css'
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
import AddModal from '../layout/AddModal/AddModal'
import catImg from '../../assets/cat.jpg'
import dogImg from '../../assets/dog.jpg'
import pigImg from '../../assets/pig.jpg'
import cowImg from '../../assets/cow.jpg'
import horseImg from '../../assets/horse.jpg'
import donkeyImg from '../../assets/donkey.jpg'

class AnimalList extends Component {
  state = {
    modal: false,
    isDropdownOpen: false,
    dropdownValue: 'Cat',
    animalTypes: ['Cat', 'Dog', 'Pig', 'Cow', 'Horse', 'Donkey']
  }

  componentDidMount() {
    this.props.getAnimals()
    // this.props.fetchAnimals()
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggleDropdown = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    })
  }

  changeDropdownValue = e => {
    this.setState({ dropdownValue: e.currentTarget.textContent })
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
      name: data.get('animalName'),
      type: this.state.dropdownValue
    }

    this.toggle()

    this.props.addAnimal(newAnimal)
  }

  // try = () => {
  //   this.props.history.push('/animals/add')
  // }

  render() {
    const { animals } = this.props.animal
    const animalCardImgStyle = {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '100%',
      width: '100%',
      paddingTop: '54.166666666667%',
      height: '0',
      borderRadius: '30px'
    }

    return (
      <Container>
        <div>
          <div className={CssModule['header-and-button']}>
            <h4>Your farm animals</h4>
            <Button
              onClick={this.toggle}
              color="dark"
              style={{ marginBottom: '2rem' }}
            >
              Add Animal
            </Button>
          </div>
          {/* <ListGroup>
            <TransitionGroup className="animal-list">
              {animals.map(({ _id, name, type }) => (
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
                    {type ? name + ' the ' + type : name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup> */}
          {/* <ListGroup> */}
          {/* <div className="cards-container"> */}
          <TransitionGroup className={CssModule['cards-container']}>
            {animals.map(({ _id, name, type }) => {
              // const typeLowered = type.toLowerCase()
              return (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  {/* <Card>
                    <CardImg
                      top
                      // width="100%"
                      src={catImg}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle>{name}</CardTitle>
                      <CardSubtitle>{type}</CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id, name)}
                      >
                        Delete
                      </Button>
                    </CardBody>
                  </Card> */}
                  <div className={CssModule['animal-card']}>
                    {/* <div
                    className={CssModule['animal-card-img']}
                    // width="100%"
                    alt="Card image cap"
                  /> */}
                    <div
                      style={{
                        ...animalCardImgStyle,
                        // backgroundImage: `url(${require(`${'../../assets/' +
                        //   typeLowered +
                        //   '.jpg'}`)})`
                        backgroundImage: `url(${
                          type === 'Cat'
                            ? catImg
                            : type === 'Dog'
                            ? dogImg
                            : type === 'Pig'
                            ? pigImg
                            : type === 'Cow'
                            ? cowImg
                            : type === 'Horse'
                            ? horseImg
                            : type === 'Donkey'
                            ? donkeyImg
                            : null
                        })`
                      }}
                    ></div>
                    <div className={CssModule['animal-card-body']}>
                      <div className={CssModule['animal-card-title']}>
                        {name}
                      </div>
                      <div className={CssModule['animal-card-subtitle']}>
                        {type}
                      </div>
                      {/* <div className="animal-card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </div> */}
                      <div className={CssModule['btns-container']}>
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="md"
                          onClick={this.onDeleteClick.bind(this, _id, name)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              )
            })}
          </TransitionGroup>
          {/* </div> */}
          {/* </ListGroup> */}
          <div>
            <AddModal
              isOpen={this.state.modal}
              toggle={this.toggle}
              submit={this.onSubmit}
              dropdownOpen={this.state.isDropdownOpen}
              toggleDropdown={this.toggleDropdown}
              dropdownValue={this.state.dropdownValue}
              changeDropdownValue={this.changeDropdownValue}
              animalTypes={this.state.animalTypes}
            />
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
