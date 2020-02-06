// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { Button, Container } from 'reactstrap'
// import Style from '../Auth.module.css'

// class Register extends Component {
//   constructor() {
//     super()
//     this.state = {
//       name: '',
//       email: '',
//       password: '',
//       password2: '',
//       errors: {}
//     }
//   }

//   onChange = e => {
//     this.setState({ [e.target.id]: e.target.value })
//   }

//   onSubmit = e => {
//     e.preventDefault()
//     const newUser = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       password2: this.state.password2
//     }
//     console.log(newUser)
//   }

//   onLoginClick = () => {
//     this.props.history.push('/login')
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
//                   <b>Register</b> below
//                 </h4>
//                 <div className={`${Style['login-area']} col`}>
//                   <p>Already have an account?</p>
//                   {/* <Button className={Style.buttons} to="/login"> */}
//                   <Button onClick={this.onLoginClick} style={styleBtn}>
//                     Log in
//                   </Button>
//                 </div>
//               </div>
//               <form noValidate onSubmit={this.onSubmit}>
//                 <div className="col">
//                   <input
//                     // className={Style.input}
//                     onChange={this.onChange}
//                     value={this.state.name}
//                     error={errors.name}
//                     id="name"
//                     type="text"
//                   />
//                   <label htmlFor="name">Name</label>
//                 </div>
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
//                   <input
//                     onChange={this.onChange}
//                     value={this.state.password2}
//                     error={errors.password2}
//                     id="password2"
//                     type="password"
//                   />
//                   <label htmlFor="password2">Confirm Password</label>
//                 </div>
//                 <div className="col">
//                   {/* <Button className={Style.buttons} type="submit"> */}
//                   <Button style={styleBtn} type="submit">
//                     Sign up
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
// export default withRouter(Register)

//testing it with form reactstrap:

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
import Style from '../Auth.module.css'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(newUser)
  }

  onLoginClick = () => {
    this.props.history.push('/login')
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
                  <b>Register</b> below
                </h4>
                <div className={`${Style['login-area']} col`}>
                  <p>Already have an account?</p>
                  {/* <Button className={Style.buttons} to="/login"> */}
                  <Button onClick={this.onLoginClick} style={styleBtn}>
                    Log in
                  </Button>
                </div>
              </div>
              <Form noValidate onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                  />
                </FormGroup>
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
                    placeholder="Enter your new password"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password2">Confirm Password</Label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    name="password2"
                    placeholder="Confirm your new password"
                  />
                </FormGroup>
                <div className={Style['submit-btn-div']}>
                  <Button style={styleBtn} type="submit">
                    Sign up
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
export default withRouter(Register)
