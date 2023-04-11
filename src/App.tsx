import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, NotFound } from './pages'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import CreatePost from './pages/createpost/CreatePost'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
