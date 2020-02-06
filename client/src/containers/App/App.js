import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import store from '../../store'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AppNavbar from '../../components/layout/AppNavbar/AppNavbar'
import Landing from '../../components/layout/Landing/Landing'
import Register from '../auth/Register/Register'
import Login from '../auth/Login/Login'
import AnimalList from '../../components/AnimalList/AnimalList'
// import AddAnimal from './components/AddAnimal'
// import EditAnimal from './components/EditAnimal'

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
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
