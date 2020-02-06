import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container } from 'reactstrap'
import CssModule from './Landing.module.css'

const Landing = () => {
  const history = useHistory()

  function handleClick(route) {
    history.push('/' + route)
  }

  return (
    <Container>
      <div style={{ height: '75vh' }}>
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Manage</b> your sanctuary farm with our smart app
            </h4>
            <div className={CssModule['p-container']}>
              <p>
                Create records of your animals with details and a lot of
                information
              </p>
            </div>
            <br />
            <div className={`${CssModule['btns-container']} col`}>
              <div>
                <Button
                  onClick={() => {
                    handleClick('register')
                  }}
                  style={{
                    width: '240px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginBottom: '10px',
                    fontSize: '22px'
                  }}
                >
                  Register
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    handleClick('login')
                  }}
                  style={{
                    width: '240px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    fontSize: '22px'
                  }}
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Landing
