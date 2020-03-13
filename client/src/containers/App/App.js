import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'
import { setCurrentUser, logoutUser } from '../../actions/authActions'

import store from '../../store'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDove } from '@fortawesome/free-solid-svg-icons'

import AppNavbar from '../../components/layout/AppNavbar/AppNavbar'
import Landing from '../../components/layout/Landing/Landing'
import Register from '../auth/Register/Register'
import Login from '../auth/Login/Login'
import PrivateRoute from '../../components/private-route/PrivateRoute'
import Home from '../Home/Home'
import AnimalList from '../AnimalList/AnimalList'
import AnimalDetails from '../AnimalDetails/AnimalDetails'
import AnimalEdit from '../AnimalEdit/AnimalEdit'
import ReleaseNotes from '../../containers/ReleaseNotes/ReleaseNotes'

library.add(faDove)

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)

  // Decode token and get user info and exp
  const decoded = jwt_decode(token)

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Redirect to login
    window.location.href = './login'
  }
}
export default class App extends Component {
  state = {}

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div>
              <AppNavbar />
            </div>
            <div className="non-navbar-content">
              <Route exact path="/">
                <Landing />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Switch>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/animals" component={AnimalList} />
                <PrivateRoute
                  exact
                  path="/animal/:id"
                  component={AnimalDetails}
                />
                <PrivateRoute
                  exact
                  path="/animal/edit/:id"
                  component={AnimalEdit}
                />
                <PrivateRoute
                  exact
                  path="/release-notes"
                  component={ReleaseNotes}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
