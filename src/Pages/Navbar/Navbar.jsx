
import React, { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout Successful!');
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Logout Failed!");
        console.error("Logout Error:", error);
      });
    setShowLogoutModal(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
  
    // Define items under each category
    const movieItems = ['falaknama das', 'hii nanna', 'yeh jaawani yeh deewani', 'khaleja'];
    const foodItems = ['dosa', 'biryani','chicken biryani', 'chicken tikka', 'pizza'];
    const fashionItems = ['anarkali', 'mini dress', 'cocktail dress', 'saree'];
  
    // Check for categories
    if (term.includes('movie')) {
      navigate('/MovieReview');
    } else if (term.includes('food')) {
      navigate('/FoodReview');
    } else if (term.includes('dress') || term.includes('fashion')) {
      navigate('/DressReview');
  
    // Check for individual items inside categories
    } else if (movieItems.includes(term)) {
      navigate('/MovieReview');
    } else if (foodItems.includes(term)) {
      navigate('/FoodReview');
    } else if (fashionItems.includes(term)) {
      navigate('/DressReview');
    } else {
      alert('No matching category or item found!');
    }
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <div className="d-flex align-items-center">
        <img
  src="https://www.shutterstock.com/image-vector/customer-satisfaction-icon-on-white-260nw-1205032477.jpg"
  alt="CritiCore Logo"
  style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '50%' }}
/>
  <a className="navbar-brand" href="/Dashboard">CritiCore</a>
</div>


          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarSearch">

            <form className="d-flex mx-auto" role="search" onSubmit={handleSearch}>
  <div className="input-group">
    <input
      className="form-control"
      type="search"
      placeholder="Browse for category or item..."
      aria-label="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ opacity: 0.5 }}
    />
    <button className="btn btn-outline-light" type="submit">
      <i className="fas fa-search"></i>
    </button>
  </div>
</form>
            <button className="btn btn-outline-light" onClick={handleShowLogoutModal} style={{ whiteSpace: 'nowrap' }}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navbar;



