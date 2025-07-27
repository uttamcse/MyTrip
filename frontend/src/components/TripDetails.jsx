import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TripDetails.css";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`http://localhost:8080/trips/${id}`);
        const data = await response.json();
        if (data.success && data.trip) {
          setTrip(data.trip);
        } else {
          setError("Trip not found");
        }
      } catch (err) {
        setError("Failed to load trip details");
      }
      setLoading(false);
    };
    fetchTrip();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="trip-details-container">
      <img
        src={trip.image || "https://via.placeholder.com/800x400"}
        alt={trip.title}
        className="trip-details-image"
      />
      <h1>{trip.title}</h1>
      <p><strong>City:</strong> {trip.city}</p>
      <p><strong>Duration:</strong> {trip.duration} Days</p>
      <p><strong>Price:</strong> ₹{trip.price}</p>
      <p className="description">{trip.description}</p>

      <div className="trip-buttons">
        <button onClick={() => navigate(`/hotels/${trip.city}`)}>Hotels</button>
        <button onClick={() => navigate(`/places/${trip.city}`)}>Places</button>
      </div>
    </div>
  );
};

export default TripDetails;
