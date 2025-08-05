import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Slideshow from './components/Slideshow'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/slideshow" element={<Slideshow />} />
      </Routes>
    </Router>
  )
}

export default App
