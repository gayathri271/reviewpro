import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Footer from '../Footer/Footer';


const Dashboard = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">MySite</a>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/">About</a></li>
              <li className="nav-item"><a className="nav-link" href="/">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="heroCarousel" className="carousel slide w-100" data-bs-ride="carousel">
  <div className="carousel-inner">
    {/* Food */}
    <div className="carousel-item active">
      <img
      
        src="https://iso.500px.com/wp-content/uploads/2015/12/food_cover.jpg"
        className="d-block w-100"
        alt="Food"
      />
      <div className="carousel-caption d-none d-md-block">
        <h1>Food Delights</h1>
        <p>Delicious bites and exotic dishes.</p>
      </div>
    </div>

    {/* Movies */}
    <div className="carousel-item">
      <img
        src="https://www.pinkvilla.com/images/2025-04/703972861_madsquare-6-days-breakeven-main-image.jpg"
        className="d-block w-100"
        alt="Movies"
      />
      <div className="carousel-caption d-none d-md-block">
        <h1>Movie Magic</h1>
        <p>Lights, camera, entertainment!</p>
      </div>
    </div>

    {/* Fashion */}
    <div className="carousel-item">
      <img
        src="https://www.shutterstock.com/image-photo/fashion-young-african-girl-black-600nw-1420132757.jpg"
        className="d-block w-100"
        alt="Fashion"
      />
      <div className="carousel-caption d-none d-md-block">
        <h1>Trendy Fashion</h1>
        <p>Style that speaks volumes.</p>
      </div>
    </div>
  </div>

  {/* Controls */}
  <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>
</div>

      {/* Themed Cards */}
      <div className="container-fluid text-center px-5" style={{ marginTop: "-40px", zIndex: 10, position: "relative" }}>
        <div className="row">
          {/* Food Card */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="https://passportmagazine.com/wp-content/uploads/2021/03/Peking-Duck.jpg" className="card-img-top" alt="Food" />
              <div className="card-body">
                <h5 className="card-title">Food</h5>
                <p className="card-text">Discover delicious recipes and cuisines.</p>
              </div>
            </div>
          </div>

          {/* Movies Card */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/001/254/680/small_2x/cinema-background-concept.jpg" className="card-img-top" alt="Movies" />
              <div className="card-body">
                <h5 className="card-title">Movies</h5>
                <p className="card-text">Find the best movies and latest reviews.</p>
              </div>
            </div>
          </div>

          {/* Dress Card */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="https://ambraee.com/cdn/shop/products/78_ff3374f2-7cbd-4004-9df8-93cdbbbecd51.jpg?v=1691223586&width=1080" className="card-img-top" alt="Dress" />
              <div className="card-body">
                <h5 className="card-title">Dress</h5>
                <p className="card-text">Explore fashion trends and style guides.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;


