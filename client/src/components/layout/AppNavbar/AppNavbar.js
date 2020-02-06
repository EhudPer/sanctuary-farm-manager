import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import '../../layout/AppNavbar/AppNavbar.css'
import logo from '../../../assets/logo.jpg'

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
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
            <NavbarBrand className="navbar-brand" href="/">
              <img src={logo} />
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
          </Container>
        </Navbar>
      </div>
    )
  }
}
export default AppNavbar
