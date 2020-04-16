import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Button } from 'semantic-ui-react'
import CssModule from './Landing.module.css'

const Landing = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const history = useHistory()

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to home
    if (isAuthenticated) {
      history.push('/home')
    }
  }, [])

  function handleClick(route) {
    history.push('/' + route)
  }

  return (
    <Container>
      <div>
        <h4>
          <b>Manage</b> your sanctuary farm with our smart app
        </h4>
        <div className={CssModule['p-container']}>
          <p>
            Create records of your animals with details and a lot of information
          </p>
        </div>
        <br />
        <div className={CssModule['btns-container']}>
          <Button
            onClick={() => {
              handleClick('register')
            }}
            // className="massive"
            className={`${CssModule.btn} massive`}

            // style={{
            //   width: '240px',
            //   borderRadius: '3px',
            //   letterSpacing: '1.5px',
            //   marginBottom: '10px',
            //   fontSize: '22px'
            // }}
          >
            Register
          </Button>

          <Button
            onClick={() => {
              handleClick('login')
            }}
            className="massive"
          >
            Log In
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default Landing
