import React, { useState } from "react";
import "./AddManagers.css";

const AddManagers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    section: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/managers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Manager added successfully!");
        setFormData({
          name: "",
          email: "",
          section: "",
        });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to add manager."}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="add-managers">
      <h1 className="form-title">Add Manager</h1>
      {message && <p className="message">{message}</p>}
      <form className="manager-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Section:
            <select
              name="section"
              className="form-select"
              value={formData.section}
              onChange={handleChange}
              required
            >
              <option value="">Select Section</option>
              <option value="sports">Sports</option>
              <option value="theatre">Theatre</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </label>
        </div>
        <button type="submit" className="form-button">
          Add Manager
        </button>
      </form>
    </div>
  );
};

export default AddManagers;
