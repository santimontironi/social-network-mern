import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import VerifyUser from './pages/VerifyUser'
import { AuthProvider } from './context/AuthContext'
import VerifyAuth from './components/VerifyAuth'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/inicio" element={<VerifyAuth>
              <Home />
            </VerifyAuth>} />
            <Route path="/verificar-email/:token" element={<VerifyUser />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
