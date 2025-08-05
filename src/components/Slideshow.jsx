import { useState } from 'react'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { slidesData } from '../data/slides'

const Slideshow = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const currentSlide = slidesData[currentSlideIndex]
  const progressPercentage = (currentSlideIndex / (slidesData.length - 1)) * 100

  const handleAnswerClick = (answer) => {
    if (answer.next !== undefined) {
      setCurrentSlideIndex(answer.next)
    }
  }

  const handleProgressClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickPercentage = (clickX / rect.width) * 100
    const targetSlide = Math.floor((clickPercentage / 100) * slidesData.length)
    
    if (targetSlide >= 0 && targetSlide < slidesData.length && targetSlide !== currentSlideIndex) {
      setCurrentSlideIndex(targetSlide)
    }
  }

  return (
    <div className="slideshow">
      <div className="slideshow-content">
        <div className="slide">
          <h1 className="slide-title">{currentSlide.title}</h1>
          <div className="slide-main-content">
            {currentSlide.image && (
              <div className="slide-image">
                <img src={currentSlide.image} alt="Slide illustration" onError={(e) => console.error('Image failed to load:', e.target.src)} style={{width: '120px', height: 'auto'}} />
              </div>
            )}
            <div 
              className="slide-content"
              dangerouslySetInnerHTML={{ __html: currentSlide.content }}
            />
          </div>
          
          <div className="slide-answers">
            {currentSlide.answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer)}
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
                  if (index !== currentSlideIndex) {
                    setCurrentSlideIndex(index)
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}

export default Slideshow
