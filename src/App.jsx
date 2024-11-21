import { useState , useContext } from 'react'
import './App.css'
import './bootstrap.min.css'
import Landing from './pages/Landing'
import Allprojects from './pages/Allprojects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { Routes , Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from './context/ContextAPI'

function App() {
  const [count, setCount] = useState(0)

  const {authContextStatus , setAuthContextStatus} = useContext(authContext)


  return (
    <>
    <Routes>
      <Route  path='/' element={<Landing/>} />
      <Route  path='/allprojects' element={authContextStatus?<Allprojects/>:<Auth/>} />
      <Route  path='/auth' element={<Auth/>} />
      <Route  path='/dash' element={authContextStatus?<Dashboard/>:<Auth/>} />
    </Routes>
    <Footer/>
    <ToastContainer />
    </>
  )
}

export default App
