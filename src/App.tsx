import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, NotFound } from './pages'

function App() {
  return (
    <div className="App">
      {/* <h1 className="text-3xl font-bold underline">Hello World</h1> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
