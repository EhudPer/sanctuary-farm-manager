import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/authActions'
import { Container, Menu, Dropdown, Button } from 'semantic-ui-react'
import CssModule from '../../layout/AppNavbar/AppNavbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    this.props.logoutUser()
  }

  render() {
    return (
      <div>
        <Container>
          <div className={CssModule['main-menu']}>
            <Menu color="black" inverted size="massive" fluid widths={6}>
              <Menu.Item header className={CssModule['navbar-brand']}>
                <FontAwesomeIcon icon="dove" className={CssModule.logo} />
                Sanctuary Farm Manager
              </Menu.Item>

              <Menu.Item name="Home" href="/" />
              <Menu.Item
                name="Animals List"
                href="/animals"
                disabled={!this.props.auth.isAuthenticated}
              />
              <Menu.Item
                name="Release Notes"
                href="/release-notes"
                disabled={!this.props.auth.isAuthenticated}
              />

              {this.props.auth.isAuthenticated ? (
                <Menu.Item>
                  <Button onClick={this.onLogoutClick}>Logout</Button>
                </Menu.Item>
              ) : (
                <Menu.Item name="Login" href="/login" />
              )}

              <Dropdown
                item
                text="More"
                disabled={!this.props.auth.isAuthenticated}
              >
                <Dropdown.Menu>
                  <Dropdown.Item>Comming Soon..</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </div>
          <div className={CssModule['secondary-menu']}>
            <Menu
              color="grey"
              inverted
              size="massive"
              stackable
              fluid
              widths={2}
            >
              <Menu.Item header className={CssModule['navbar-brand']}>
                <FontAwesomeIcon icon="dove" className={CssModule.logo} />
                Sanctuary Farm Manager
              </Menu.Item>

              <Dropdown item text="Menu">
                <Dropdown.Menu>
                  <Dropdown.Item href="/">Home</Dropdown.Item>
                  <Dropdown.Item
                    href="/animals"
                    disabled={!this.props.auth.isAuthenticated}
                  >
                    Animals List
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/release-notes"
                    disabled={!this.props.auth.isAuthenticated}
                  >
                    Release Notes
                  </Dropdown.Item>
                  {this.props.auth.isAuthenticated ? (
                    <Menu.Item>
                      <Button onClick={this.onLogoutClick}>Logout</Button>
                    </Menu.Item>
                  ) : (
                    <Menu.Item name="Login" href="/login" />
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </div>
        </Container>
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
