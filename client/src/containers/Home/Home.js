import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { Container, Button } from 'reactstrap'
import CssModule from './Home.module.css'
// import homeImg from '../../assets/home.jpeg'

class Home extends Component {
  onLogoutClick = e => {
    e.preventDefault()

    this.props.logoutUser()
  }

  onMyAnimalsClick = () => {
    this.props.history.push('/animals')
  }

  onReleaseNotesClick = () => {
    this.props.history.push('/release-notes')
  }

  render() {
    const { user } = this.props.auth
    return (
      <Container>
        <div>
          <h4>
            <b>Hey there,</b> {user.name.split(' ')[0]}
          </h4>
          <div className={CssModule['p-container']}>
            <p>
              You are logged into your account in our sanctuary farm manager app
              👏
            </p>
          </div>
          <div className={CssModule['img-div']}></div>
          <div className={CssModule['list-btn-container']}>
            <Button
              onClick={this.onMyAnimalsClick}
              className={CssModule['list-btn']}
            >
              Your Animals
            </Button>
          </div>
          <div className={CssModule['list-btn-container']}>
            <Button
              onClick={this.onReleaseNotesClick}
              className={CssModule['list-btn']}
            >
              Release Notes
            </Button>
          </div>
          {/* <Button
            style={{
              width: '150px',
              borderRadius: '3px',
              letterSpacing: '1.5px',
              marginTop: '1rem'
            }}
            onClick={this.onLogoutClick}
          >
            Logout
          </Button> */}
        </div>
      </Container>
    )
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Home)
