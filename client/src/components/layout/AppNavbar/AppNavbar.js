import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/authActions'
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import CssModule from '../../layout/AppNavbar/AppNavbar.module.css'
import logo from '../../../assets/logo.jpg'
import App from '../../../containers/App/App'

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onLogoutClick = e => {
    e.preventDefault()
    console.log(this.props.auth.isAuthenticated)

    this.props.logoutUser()
  }

  render() {
    return (
      <div
        style={{
          margin: 'auto',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '1000'
        }}
      >
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand className={CssModule['navbar-brand']} href="/">
              <img className={CssModule['logo-img']} src={logo} />
              Sanctuary Farm Manager
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/ehudper">Menu</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            {this.props.auth.isAuthenticated ? (
              <Button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem'
                }}
                onClick={this.onLogoutClick}
              >
                Logout
              </Button>
            ) : null}
          </Container>
        </Navbar>
      </div>
    )
  }
}

AppNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(AppNavbar)
