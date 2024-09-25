import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/forgot' element={<ForgotPasswordPage />} />
      </Routes>
    </>
  )
}

export default App
