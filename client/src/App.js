import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AppNavbar from './components/AppNavbar'
import AnimalList from './components/AnimalList'
// import AddAnimal from './components/AddAnimal'
// import EditAnimal from './components/EditAnimal'

import store from './store'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default class App extends Component {
  state = {}

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div>
              <AppNavbar />
              <AnimalList />
            </div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/*<div style={{ paddingTop: "90px" }}>        */}
            <div>
              <Switch>
                {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route> */}
                {/* <Route exact path="/" component={AnimalList} /> */}
                {/* <Route path="/animals/add" component={AddAnimal} /> */}
                {/* <Route path="/animals/edit" component={EditAnimal} /> */}
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
