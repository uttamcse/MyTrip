// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Debounced search (on typing)
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (searchQuery.trim()) {
//         fetchResults(searchQuery);
//       } else {
//         setResults([]); // Clear when input empty
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   // Fetch search results
//   const fetchResults = async (query) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:8080/search?city=${query}`);
//       const data = await response.json();
//       if (data.success && data.trips) {
//         setResults(data.trips);
//       } else {
//         setResults([]);
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setResults([]);
//     }
//     setLoading(false);
//   };

//   // Manual search (button click)
//   const handleSearchClick = () => {
//     if (searchQuery.trim()) {
//       fetchResults(searchQuery);
//     }
//   };

//   return (
//     <header className="navbar">
//       <div className="navbar-container">
//         {/* Logo */}
//         <h1 className="logo" onClick={() => navigate("/")}>TravelMate</h1>

//         {/* Navigation Links */}
//         <nav className="nav-links">
//           <button onClick={() => navigate("/")}>Home</button>
//           <button onClick={() => navigate("/about")}>About Us</button>
//         </nav>

//         {/* Search Box */}
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search destinations..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button onClick={handleSearchClick}>Search</button>
//           {loading && <span style={{ marginLeft: "10px" }}>⏳</span>}

//           {/* Live Search Results */}
//           {results.length > 0 && (
//             <div className="search-results">
//               {results.map((trip) => (
//                 <div
//                   key={trip._id}
//                   className="result-item"
//                   onClick={() => {
//                     navigate(`/trip/${trip._id}`);
//                     setSearchQuery("");
//                     setResults([]);
//                   }}
//                 >
//                   <img
//                     src={trip.image || "https://via.placeholder.com/50"}
//                     alt={trip.title}
//                   />
//                   <div>
//                     <h4>{trip.title}</h4>
//                     <p>{trip.city} • {trip.duration} Days • ₹{trip.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Debounced search (on typing)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchResults(searchQuery);
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Fetch search results
  const fetchResults = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/search?city=${query}`);
      const data = await response.json();
      if (data.success && data.trips) {
        setResults(data.trips);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
    setLoading(false);
  };

  // Manual search (button click)
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      fetchResults(searchQuery);
      setShowDropdown(true);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="search-box" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchClick}>Search</button>
          {loading && <span style={{ marginLeft: "10px" }}>⏳</span>}

          {/* Dropdown Results */}
          {showDropdown && results.length > 0 && (
            <div className="dropdown-results">
              {results.map((trip) => (
                <div
                  key={trip._id}
                  className="result-item"
                  onClick={() => {
                    navigate(`/trip/${trip._id}`);
                    setSearchQuery("");
                    setResults([]);
                    setShowDropdown(false);
                  }}
                >
                  <img
                    src={trip.image || "https://via.placeholder.com/50"}
                    alt={trip.title}
                  />
                  <div>
                    <h4>{trip.title}</h4>
                    <p>{trip.city} • {trip.duration} Days • ₹{trip.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
