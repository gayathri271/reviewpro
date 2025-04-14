import './App.css'
import Login from './Authentication/Login/Login'
import Signup from './Authentication/Signup/Signup'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import MovieReview from './Pages/Categories/Movie/MovieReview'
import FoodReview from './Pages/Categories/Food/FoodReview'
import Footer from './Pages/Footer/Footer'
import MovieDetails from './Pages/Categories/Movie/MovieDetails'
import FoodDetails from './Pages/Categories/Food/FoodDetails'
import DressReview from './Pages/Categories/Dress/dressReview'
import DressDetails from './Pages/Categories/Dress/DressDetails'


function App() {

  return (
    <>
    <Routes>
    {/* <Route path="/" element={<h1>Welcome to the Review Platform</h1>} /> */}
    <Route path="/Signup" element={<Signup />} />
    <Route path="/Login" element={<Login />}/>
    <Route path='/Dashboard' element={<Dashboard />} />  
    <Route path='/Footer' element={<Footer />}/>
    <Route path="/MovieReview" element={<MovieReview />} />
    <Route path="/MovieDetails/:title" element={<MovieDetails />} />
    <Route path="/FoodReview" element={<FoodReview />}/>
    <Route path="/FoodDetails/:title" element={<FoodDetails />}/>
    <Route path="/dressReview" element={<DressReview />}/>
    <Route path="/dressReview/:title" element={<DressDetails />}/>


    </Routes>
    </>
  )
}

export default App
