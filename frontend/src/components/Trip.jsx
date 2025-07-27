import React, { useState } from "react";
import "./Trip.css";

const Trip = () => {
  const trips = [
    {
      id: 1,
      title: "Royal Heritage Tour of Jaipur",
      city: "Jaipur",
      duration: 4,
      price: 444,
      description: "Explore Jaipur's palaces, forts, and vibrant bazaars.",
      image: "https://source.unsplash.com/400x300/?jaipur,india",
    },
    {
      id: 2,
      title: "Beach Bliss in Goa",
      city: "Goa",
      duration: 5,
      price: 599,
      description: "Relax on sunny beaches and enjoy Goa's nightlife.",
      image: "https://source.unsplash.com/400x300/?goa,beach",
    },
    {
      id: 3,
      title: "Backwaters of Kerala",
      city: "Kerala",
      duration: 3,
      price: 499,
      description: "Experience Kerala's serene backwaters and houseboats.",
      image: "https://source.unsplash.com/400x300/?kerala,backwaters",
    },
    {
      id: 4,
      title: "Adventure in Manali",
      city: "Manali",
      duration: 6,
      price: 650,
      description: "Snow-capped mountains and thrilling adventures await.",
      image: "https://source.unsplash.com/400x300/?manali,himachal",
    },
    {
      id: 5,
      title: "City Lights of Mumbai",
      city: "Mumbai",
      duration: 2,
      price: 399,
      description: "Explore Mumbai's bustling streets and nightlife.",
      image: "https://source.unsplash.com/400x300/?mumbai,city",
    },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedTrips = trips.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(trips.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="trip-container">
      <header className="hero">
        <h1>Discover Amazing Trips</h1>
        <p>Plan your perfect vacation with us!</p>
      </header>

      <section className="trip-section">
        <div className="trip-grid">
          {selectedTrips.map((trip) => (
            <div className="trip-card" key={trip.id}>
              <img src={trip.image} alt={trip.title} className="trip-image" />
              <div className="trip-info">
                <h2>{trip.title}</h2>
                <p className="city">{trip.city}</p>
                <p className="description">{trip.description}</p>
                <p className="duration">Duration: {trip.duration} Days</p>
                <p className="price">Price: ₹{trip.price}</p>
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Trip;
