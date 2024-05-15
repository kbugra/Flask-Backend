import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import the AuthContext

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext); // Get the context

  // Ensure authContext is defined
  if (!authContext) {
    throw new Error('Navbar must be used within an AuthProvider');
  }

  const { user, setUser } = authContext; // Use destructuring to get user and setUser
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!user);
    setIsAdmin(user?.isAdmin || false);
  }, [user]);

  const handleLogout = async () => {
    await fetch('/logout', { method: 'POST' });
    setUser(null); // Update the user's authentication status
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
      <Link to="/" className="navbar-brand">
        <h1 className="m-0 text-primary"><i className="fa fa-book-reader me-3"></i>Kider</h1>
      </Link>
      <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav mx-auto">
          <Link to="/index" className="nav-item nav-link">Home</Link>
          <Link to="/about" className="nav-item nav-link">About Us</Link>
          <Link to="/classes" className="nav-item nav-link">Classes</Link>
          <div className="nav-item dropdown">
            <Link to="#" className="nav-link dropdown-toggle " data-bs-toggle="dropdown">Pages</Link>
            <div className="dropdown-menu rounded-0 rounded-bottom border-0 m-0">
              <Link to="/facility" className="dropdown-item">School Facilities</Link>
              <Link to="/team" className="dropdown-item">Popular Teachers</Link>
              <Link to="/teacherformsubmit" className="dropdown-item">Become A Teachers</Link>
              <Link to="/appointment" className="dropdown-item">Make Appointment</Link>
              <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
            </div>
          </div>
          <Link to="/contact" className="nav-item nav-link">Contact Us</Link>
        </div>
        {isAuthenticated ? (
          <>
            <Link to={`/dashboard/${user?.username}`} className="btn btn-outline-primary">
              Merhaba {user?.username}
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Çıkış Yap
            </button>
            <Link to="/cart" className="btn btn-outline-primary">
              <img src="/static/img/cart.png" alt="Cart" style={{ width: '20px', height: '20px' }} />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary rounded-pill px-3 d-none d-lg-block">
              Log In
            </Link>
            <Link to="/cart" className="btn btn-outline-primary">
              <img src="/static/img/cart.png" alt="Cart" style={{ width: '20px', height: '20px' }} />
            </Link>
          </>
        )}
        {user?.username === 'admin' && (
          <Link to="/admin_dashboard" className="nav-item nav-link">Admin</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;