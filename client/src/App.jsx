import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login'
import NotFound from './NotFound'
import SignUp from './SignUp'
import { Toaster } from 'react-hot-toast';
import Expenses from './Expenses'
import LeaderBoard from './LeaderBoard'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

function App() {

  return (
    <div>
      <Toaster/>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/expenses' element ={<Expenses/>}/>
          <Route path='/leaderboard' element ={<LeaderBoard/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/resetpassword/:id' element={<ResetPassword/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
      
  )
}

export default App
