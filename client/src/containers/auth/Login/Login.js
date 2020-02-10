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
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../../actions/authActions'
import classnames from 'classnames'
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

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/home') // push user to home when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
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

    this.props.loginUser(userData)
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
                  <Label for="email">Email:</Label>
                  <span className="text-danger">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                  <Input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className={classnames('', {
                      'border border-danger':
                        errors.email || errors.emailnotfound
                    })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password:</Label>
                  <span className="text-danger">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                  <Input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={classnames('', {
                      'border border-danger':
                        errors.password || errors.passwordincorrect
                    })}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login))
