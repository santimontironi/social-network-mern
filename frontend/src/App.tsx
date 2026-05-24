import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" Component={Login} />
            <Route path="/registro" Component={Register} />
            <Route path="/inicio" Component={Home} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
