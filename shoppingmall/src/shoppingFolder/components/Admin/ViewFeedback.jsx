import React, { useState, useEffect } from "react";
import './ViewFeedBack.css'

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/feedbacks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks.");
        }
        return response.json();
      })
      .then((data) => setFeedbacks(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div class='hi'>
      <h1>Feedbacks</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <strong>{feedback.name}:</strong> {feedback.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFeedback;
