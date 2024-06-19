import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login'
import NotFound from './NotFound'
import SignUp from './SignUp'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Toaster/>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
      
  )
}

export default App
