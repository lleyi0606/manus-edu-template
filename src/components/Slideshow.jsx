import { useState, useCallback } from 'react'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import Scratcher from './Scratcher'
import { slidesData } from '../data/slides'

const Slideshow = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showScratcher, setShowScratcher] = useState(false)

  const currentSlide = slidesData[currentSlideIndex]
  const progressPercentage = ((currentSlideIndex + 1) / slidesData.length) * 100

  const goToSlide = useCallback((targetIndex) => {
    if (isTransitioning || targetIndex === currentSlideIndex) return
    
    setIsTransitioning(true)
    setShowScratcher(true)
  }, [isTransitioning, currentSlideIndex])

  const handleScratcherComplete = useCallback(() => {
    setShowScratcher(false)
    setIsTransitioning(false)
  }, [])

  const handleAnswerClick = (answer) => {
    if (isTransitioning) return
    
    if (answer.next !== undefined) {
      setIsTransitioning(true)
      setShowScratcher(true)
      
      setTimeout(() => {
        setCurrentSlideIndex(answer.next)
        setShowScratcher(false)
        setIsTransitioning(false)
      }, 1000)
    }
  }

  const handleProgressClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickPercentage = (clickX / rect.width) * 100
    const targetSlide = Math.floor((clickPercentage / 100) * slidesData.length)
    
    if (targetSlide >= 0 && targetSlide < slidesData.length && targetSlide !== currentSlideIndex) {
      goToSlide(targetSlide)
      setTimeout(() => {
        setCurrentSlideIndex(targetSlide)
        setShowScratcher(false)
        setIsTransitioning(false)
      }, 1000)
    }
  }

  return (
    <div className="slideshow">
      <div className="slideshow-content">
        <div className="slide">
          <h1 className="slide-title">{currentSlide.title}</h1>
          <div 
            className="slide-content"
            dangerouslySetInnerHTML={{ __html: currentSlide.content }}
          />
          
          <div className="slide-answers">
            {currentSlide.answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                disabled={isTransitioning}
                className={`answer-button ${answer.correct ? 'correct' : ''}`}
                variant="outline"
                size="lg"
              >
                {answer.text}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-info">
          <span>Slide {currentSlideIndex + 1} of {slidesData.length}</span>
        </div>
        <div className="progress-container" onClick={handleProgressClick}>
          <Progress value={progressPercentage} className="progress-bar" />
          <div className="progress-dots">
            {slidesData.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentSlideIndex ? 'active' : ''} ${index < currentSlideIndex ? 'completed' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  goToSlide(index)
                  setTimeout(() => {
                    setCurrentSlideIndex(index)
                    setShowScratcher(false)
                    setIsTransitioning(false)
                  }, 1000)
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Scratcher 
        isVisible={showScratcher} 
        onAnimationComplete={handleScratcherComplete}
      />
    </div>
  )
}

export default Slideshow
