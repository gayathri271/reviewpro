import './App.css'
import Login from './Authentication/Login/Login'
import Signup from './Authentication/Signup/Signup'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Footer from './Pages/Footer/Footer'

function App() {

  return (
    <>
    <Routes>
    {/* <Route path="/" element={<h1>Welcome to the Review Platform</h1>} /> */}
    <Route path="/Signup" element={<Signup />} />
    <Route path="/Login" element={<Login />}/>
    <Route path='/Dashboard' element={<Dashboard />} />  
    <Route path='/Footer' element={<Footer />}/>
    </Routes>
    </>
  )
}

export default App
