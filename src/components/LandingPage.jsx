import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const LandingPage = () => {
  const navigate = useNavigate()

  const startSlideshow = () => {
    navigate('/slideshow')
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Educational Slideshow Game</h1>
        <div className="landing-description">
          <p>
            Welcome to an interactive educational experience! This slideshow will guide you 
            through engaging content with questions and activities designed to help you learn.
          </p>
          <p>
            Navigate through the slides by answering questions correctly or clicking on the 
            progress bar at the bottom of the screen.
          </p>
        </div>
        <Button 
          onClick={startSlideshow}
          className="start-button"
          size="lg"
        >
          Start Learning
        </Button>
      </div>
    </div>
  )
}

export default LandingPage
