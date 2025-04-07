import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer text-light py-5">
      <div className="container">
        <div className="row">

          {/* Products/Services */}
          <div className="col-md-3">
            <h5>FEATURES</h5>
            <ul className="list-unstyled">
              <li>Submit Reviews</li>
              <li>Browse Categories</li>
              <li>Rating System</li>
              <li>Trending Products</li>
              <li>Verified Feedback</li>
            </ul>
          </div>

          {/* About */}
          <div className="col-md-3">
            <h5>ABOUT US</h5>
            <ul className="list-unstyled">
              <li>Our Story</li>
              <li>Team</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-3">
            <h5>CATEGORIES</h5>
            <ul className="list-unstyled">
              <li>Electronics</li>
              <li>Beauty & Wellness</li>
              <li>Food & Restaurants</li>
              <li>Movies & Shows</li>
              <li>Fashion</li>
            </ul>
          </div>

          {/* Tools & Contact */}
          <div className="col-md-3">
            <h5>CONTACT</h5>
            <ul className="list-unstyled">
              <li>Help Center</li>
              <li>Partner with Us</li>
              <li>Feedback</li>
              <li><strong>Call:</strong> 888-555-2025</li>
              <li className="social-icons mt-2">
                <FaFacebook className="me-2" />
                <FaTwitter className="me-2" />
                <FaLinkedin />
              </li>
            </ul>
          </div>

        </div>

        <div className="text-center mt-4 small">
          © {new Date().getFullYear()} ReviewPlatform | Terms | Privacy | Contact | Sitemap
        </div>
      </div>
    </footer>
  );
};

export default Footer;
