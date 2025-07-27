import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h1 className="logo" onClick={() => navigate("/")}>TravelMate</h1>

        {/* Navigation Links */}
        <nav className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/about")}>About Us</button>
        </nav>

        {/* Search Box */}
        <div className="search-box">
          <input type="text" placeholder="Search destinations..." />
          <button>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
