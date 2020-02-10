import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'
import { setCurrentUser, logoutUser } from '../../actions/authActions'

import store from '../../store'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AppNavbar from '../../components/layout/AppNavbar/AppNavbar'
import Landing from '../../components/layout/Landing/Landing'
import Register from '../auth/Register/Register'
import Login from '../auth/Login/Login'
import PrivateRoute from '../../components/private-route/PrivateRoute'
import Home from '../Home/Home'
import AnimalList from '../../components/AnimalList/AnimalList'
import ReleaseNotes from '../../containers/ReleaseNotes/ReleaseNotes'

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
              {/* <AnimalList /> */}
            </div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/*<div style={{ paddingTop: "90px" }}>        */}
            <div>
              {/* <Switch> */}
              {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>*/}
              <Route exact path="/">
                {/* <Home /> */}
                <Landing />
              </Route>
              {/* <Route exact path="/" component={AnimalList} /> */}
              {/* <Route path="/animals/add" component={AddAnimal} /> */}
              {/* <Route path="/animals/edit" component={EditAnimal} /> */}
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              {/* </Switch> */}
              {/* <Route exact path="/home">
                <Home />
              </Route> */}
              <Switch>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/animals" component={AnimalList} />
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
