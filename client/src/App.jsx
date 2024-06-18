import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login'
import NotFound from './NotFound'

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
  )
}

export default App
