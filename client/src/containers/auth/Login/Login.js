// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { Button, Container, Input } from 'reactstrap'
// import CssModule from '../Auth.module.css'

// class Login extends Component {
//   constructor() {
//     super()
//     this.state = {
//       email: '',
//       password: '',
//       errors: {}
//     }
//   }

//   onChange = e => {
//     this.setState({ [e.target.id]: e.target.value })
//   }

//   onSubmit = e => {
//     e.preventDefault()
//     const userData = {
//       email: this.state.email,
//       password: this.state.password
//     }
//     console.log(userData)
//   }

//   onRegisterClick = () => {
//     this.props.history.push('/register')
//   }

//   render() {
//     const { errors } = this.state
//     const styleBtn = {
//       width: '150px',
//       borderRadius: '3px',
//       letterSpacing: '1.5px'
//       // marginTop: '1rem'
//     }

//     return (
//       <Container>
//         <div>
//           <div className="row">
//             <div className="col">
//               <div className="col">
//                 <h4>
//                   <b>Login</b> below
//                 </h4>
//                 <div className={`${CssModule['login-area']} col`}>
//                   <p>Don't have an account?</p>
//                   <Button
//                     onClick={this.onRegisterClick}
//                     style={styleBtn}
//                     to="/register"
//                   >
//                     Register
//                   </Button>
//                 </div>
//               </div>
//               <form noValidate onSubmit={this.onSubmit}>
//                 <div className="col">
//                   <input
//                     onChange={this.onChange}
//                     value={this.state.email}
//                     error={errors.email}
//                     id="email"
//                     type="email"
//                   />
//                   <label htmlFor="email">Email</label>
//                 </div>
//                 <div className="col">
//                   <input
//                     onChange={this.onChange}
//                     value={this.state.password}
//                     error={errors.password}
//                     id="password"
//                     type="password"
//                   />
//                   <label htmlFor="password">Password</label>
//                 </div>
//                 <div className="col">
//                   <Button style={styleBtn} type="submit">
//                     Login
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Container>
//     )
//   }
// }

// export default withRouter(Login)

//with reactstrap forms attempt:

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap'
import CssModule from '../Auth.module.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(userData)
  }

  onRegisterClick = () => {
    this.props.history.push('/register')
  }

  render() {
    const { errors } = this.state
    const styleBtn = {
      width: '150px',
      borderRadius: '3px',
      letterSpacing: '1.5px'
      // marginTop: '1rem'
    }

    return (
      <Container>
        <div>
          <div className="row">
            <div className="col">
              <div className="col">
                <h4>
                  <b>Login</b> below
                </h4>
                <div className={`${CssModule['login-area']} col`}>
                  <p>Don't have an account?</p>
                  <Button
                    onClick={this.onRegisterClick}
                    style={styleBtn}
                    to="/register"
                  >
                    Register
                  </Button>
                </div>
              </div>
              <Form noValidate onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </FormGroup>
                <div className={CssModule['submit-btn-div']}>
                  <Button style={styleBtn} type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default withRouter(Login)
