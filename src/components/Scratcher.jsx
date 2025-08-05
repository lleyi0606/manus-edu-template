import { useState, useEffect } from 'react'

const Scratcher = ({ isVisible, onAnimationComplete }) => {
  const [frame, setFrame] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('in') // 'in' or 'out'

  useEffect(() => {
    if (isVisible && !isAnimating) {
      setIsAnimating(true)
      setDirection('in')
      setFrame(0)
      
      const interval = setInterval(() => {
        setFrame(prevFrame => {
          if (prevFrame >= 19) {
            clearInterval(interval)
            setDirection('out')
            setFrame(0)
            
            setTimeout(() => {
              const outInterval = setInterval(() => {
                setFrame(outFrame => {
                  if (outFrame >= 19) {
                    clearInterval(outInterval)
                    setIsAnimating(false)
                    if (onAnimationComplete) {
                      onAnimationComplete()
                    }
                    return 0
                  }
                  return outFrame + 1
                })
              }, 40)
            }, 100)
            
            return 19
          }
          return prevFrame + 1
        })
      }, 40)
    }
  }, [isVisible, isAnimating, onAnimationComplete])

  if (!isVisible) return null

  const backgroundPosition = `${direction === 'in' ? 0 : -100}% ${frame * -100}%`

  return (
    <div 
      className="scratcher"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        backgroundImage: 'url(/scratcher-sprite.png)',
        backgroundSize: '200% 2000%',
        backgroundPosition: backgroundPosition,
        backgroundRepeat: 'no-repeat'
      }}
    />
  )
}

export default Scratcher
