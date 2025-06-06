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
import DressReview from './Pages/Categories/Dress/DressReview'
import DressDetails from './Pages/Categories/Dress/DressDetails'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LaunchPage from './Authentication/LaunchPage/LaunchPage'
// import SkeletonLoader from './Skeleton/Skeleton'
import ProtectedRoute from './Authentication/ProtectedRoutes/ProtectedRoutes'
import Navbar from './Pages/Navbar/Navbar'
// import Navbar from './Pages/Navbar/Navbar'







function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LaunchPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Navbar" element={<Navbar />}/>
        <Route path="/Footer" element={<Footer />} />

        {/* Protected Routes */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MovieReview"
          element={
            <ProtectedRoute>
              <MovieReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FoodReview"
          element={
            <ProtectedRoute>
              <FoodReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dressReview"
          element={
            <ProtectedRoute>
              <DressReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MovieDetails/:title"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FoodDetails/:title"
          element={
            <ProtectedRoute>
              <FoodDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dressDetails/:title"
          element={
            <ProtectedRoute>
              <DressDetails />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App
