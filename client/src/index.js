import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App/App'
import { BrowserRouter, Route } from 'react-router-dom'

//ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById('root')
)
