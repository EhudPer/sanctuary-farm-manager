import React from 'react'
import { Container } from 'reactstrap'
import CssModule from './ReleaseNotes.module.css'
import releaseNotesText from '../../files/releaseNotes'

const ReleaseNotes = () => {
  return (
    <Container>
      <div>
        <h4>
          <b>App Version Release Notes</b>
        </h4>
        <div className={CssModule['img-div']}></div>
        <span>Photo by David Travis on Unsplash</span>
      </div>
      <div className={CssModule['divs-container']}>
        {releaseNotesText.split('\n').map((i, key) => {
          return <div key={key}>{i}</div>
        })}
      </div>
    </Container>
  )
}

export default ReleaseNotes
