import React, { useState, useEffect } from "react";
import "./Trip.css";

const Trip = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const predefinedQuestions = [
    { message: "Show me trips to Goa" },
    { message: "I want hotels in Jaipur" },
    { message: "What can I visit in Mysure" },
    { message: "Tell me about food in Udaipur" },
  ];

  // Fetch trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:8080/trips");
        const data = await response.json();
        if (data.success && data.trips) {
          setTrips(data.trips);
        } else {
          setError("No trips found");
        }
      } catch (err) {
        setError("Failed to fetch trips");
      }
      setLoading(false);
    };

    fetchTrips();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedTrips = trips.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(trips.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Chatbot API call
  const handleSendMessage = async (message = null) => {
    const query = message || chatInput;
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:8080/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      if (data.success) {
        const botMessage = {
          sender: "bot",
          text: data.message,
          trips: data.data || [],
        };
        setChatMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Try again." },
      ]);
    }

    setChatInput("");
  };

  if (loading) return <div className="trip-container">Loading trips...</div>;
  if (error) return <div className="trip-container">{error}</div>;

  return (
    <div className="trip-container">
      <header className="hero">
        <h1>Discover Amazing Trips</h1>
        <p>Plan your perfect vacation with us!</p>
      </header>

      <section className="trip-section">
        <div className="trip-grid">
          {selectedTrips.map((trip) => (
            <div className="trip-card" key={trip._id}>
              <img
                src={trip.image || "https://via.placeholder.com/400x300"}
                alt={trip.title}
                className="trip-image"
              />
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

      {/* ✅ Chatbot Widget */}
      <div className="chatbot-container">
        {!chatOpen ? (
          <button className="chatbot-toggle" onClick={() => setChatOpen(true)}>
            💬
          </button>
        ) : (
          <div className="chatbot-box">
            <div className="chatbot-header">
              <h4>Travel Assistant</h4>
              <button onClick={() => setChatOpen(false)}>✖</button>
            </div>

            {/* ✅ Predefined Questions */}
            <div className="chatbot-quick-questions">
              {predefinedQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(item.message)}
                >
                  {item.message}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="chatbot-messages">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === "user" ? "user" : "bot"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.trips && msg.trips.length > 0 && (
                    <div className="chat-trips">
                      {msg.trips.map((trip) => (
                        <div key={trip._id} className="chat-trip-card">
                          <img src={trip.image} alt={trip.title} />
                          <p>{trip.title}</p>
                          <span>₹{trip.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Ask me about trips..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={() => handleSendMessage()}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trip;
