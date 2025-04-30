
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../HeroBanner/HeroBanner'; 
import { ToastContainer } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import SkeletonLoader from '../../Skeleton/Skeleton'; // Ensure you have this component
import Navbar from '../Navbar/Navbar';


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after data is loaded
    }, 2000); // Simulate a 2-second delay
  }, []);


  const scrollToCards = () => {
    const cardsSection = document.getElementById('cards');
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  
  // useEffect(() => {
  //   const handleResize = () => setWindowWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [])


  // const carouselImageStyle = {
  //   height: windowWidth <= 320 ? "200px" : "500px",
  //   objectFit: "cover",
  // };
  // const captionStyle = {
  //   fontSize: windowWidth <= 320 ? "1rem" : "2rem",
  // };
  

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      
      <div id="heroCarousel" className="carousel slide w-100" data-bs-ride="carousel">
  <div className="carousel-inner">

    <div className="carousel-item active">
      <img
        src="https://www.deputy.com/uploads/2018/10/The-Most-Popular-Menu-Items-That-You-should-Consider-Adding-to-Your-Restaurant_Content-image1-min-1024x569.png"
        className="d-block w-100"
        alt="Food"
      />
      {/* <div className="carousel-caption d-none d-md-block"> */}
      <div className="carousel-caption ">
        <h1>Food Delights</h1>
        <p>Delicious bites and exotic dishes.</p>
      </div>
    </div>


    <div className="carousel-item">
      <img
        src="https://www.pinkvilla.com/images/2025-04/703972861_madsquare-6-days-breakeven-main-image.jpg"
        className="d-block w-100"
        alt="Movies"
      />
      <div className="carousel-caption">
        <h1>Movie Magic</h1>
        <p>Lights, camera, entertainment!</p>
      </div>
    </div>


    <div className="carousel-item">
      <img
        src="https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/02/cover-4-800x600.png"
        // src="https://www.shutterstock.com/image-photo/fashion-young-african-girl-black-600nw-1420132757.jpg"

        className="d-block w-100"
        alt="Fashion"
      />
      <div className="carousel-caption">
        <h1>Trendy Fashion</h1>
        <p>Style that speaks volumes.</p>
      </div>
    </div>
  </div>

      {/* Carousel Controls */}
  <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

{/* <div
      id="heroCarousel"
      className="carousel slide w-100"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
      <div className="carousel-item active">
          <img
            src="https://www.deputy.com/uploads/2018/10/The-Most-Popular-Menu-Items-That-You-should-Consider-Adding-to-Your-Restaurant_Content-image1-min-1024x569.png"
            className="d-block w-100"
            alt="Food"
            style={carouselImageStyle}
          />
          <div className="carousel-caption d-none d-md-block">
            <h1 style={captionStyle}>Food Delights</h1>
            <p>Delicious bites and exotic dishes.</p>
          </div>
        </div>
        <div className="carousel-item active">
          <img
            src="https://www.pinkvilla.com/images/2025-04/703972861_madsquare-6-days-breakeven-main-image.jpg"
            className="d-block w-100"
            alt="Food"
            style={carouselImageStyle}
          />
          <div className="carousel-caption d-none d-md-block">
            <h1 style={captionStyle}>Movie Magic</h1>
            <p>Lights, camera, entertainment!</p>
          </div>
        </div>
        <div className="carousel-item active">
          <img
            src="https://www.shutterstock.com/image-photo/fashion-young-african-girl-black-600nw-1420132757.jpg"
            className="d-block w-100"
            alt="Food"
            style={carouselImageStyle}
          />
          <div className="carousel-caption d-none d-md-block">
            <h1 style={captionStyle}>Trendy Fashion</h1>
            <p>Style that speaks volumes.</p>
          </div>
        </div>
       
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div> */}



      <HeroBanner onExploreClick={scrollToCards} />

      {/* Themed Cards */}
      {isLoading ? <SkeletonLoader /> : (
        <div className="container-fluid text-center px-5" style={{ marginTop: "-40px", zIndex: 10, position: "relative" }} id="cards">
          <div className="row">
            {/* Food Card */}
            <div className="col-md-4 mb-4" onClick={() => navigate("/FoodReview")}>
              <div className="card h-100">
                <img src="https://passportmagazine.com/wp-content/uploads/2021/03/Peking-Duck.jpg" className="card-img-top" alt="Food" />
                <div className="card-body">
                  <h5 className="card-title">Food</h5>
                  <p className="card-text">Discover delicious recipes and cuisines.</p>
                </div>
              </div>
            </div>

            {/* Movies Card */}
            <div className="col-md-4 mb-4" onClick={() => navigate("/MovieReview")}>
              <div className="card h-100">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/001/254/680/small_2x/cinema-background-concept.jpg" className="card-img-top" alt="Movies" />
                <div className="card-body">
                  <h5 className="card-title">Movies</h5>
                  <p className="card-text">Find the best movies and latest reviews.</p>
                </div>
              </div>
            </div>

            {/* Dress Card */}
            <div className="col-md-4 mb-4" onClick={() => navigate("/DressReview")}>
              <div className="card h-100">
                <img src="https://ambraee.com/cdn/shop/products/78_ff3374f2-7cbd-4004-9df8-93cdbbbecd51.jpg?v=1691223586&width=1080" className="card-img-top" alt="Dress" />
                <div className="card-body">
                  <h5 className="card-title">Fashion</h5>
                  <p className="card-text">Explore fashion trends and style guides.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
};

export default Dashboard;
