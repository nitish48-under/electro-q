import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Quiz from './Quiz'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/quiz/:subject" element={<Quiz />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App