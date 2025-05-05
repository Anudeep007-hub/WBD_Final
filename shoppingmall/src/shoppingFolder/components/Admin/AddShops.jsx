import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddShops.css'; // Assuming you have a CSS file for styling

const AddShops = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState('');
  const [workingHours, setWorkingHours] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  });
  const [owner, setOwner] = useState({
    name: '',
    contact: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (name.trim().length < 3) {
      errors.name = 'Shop name must be at least 3 characters long.';
    }

    // Location validation
    if (location.trim().length < 3) {
      errors.location = 'Location must be at least 3 characters long.';
    }

    // Contact validation (10-digit number)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      errors.contact = 'Contact number must be a valid 10-digit number.';
    }

    // Image URL validation (optional, check for URL format if provided)
    const urlRegex = /^(https?:\/\/[^\s]+)$/;
    if (image && !urlRegex.test(image)) {
      errors.image = 'Please enter a valid URL for the image.';
    }

    // Owner name, contact, and email validation
    if (owner.name.trim().length < 3) {
      errors.ownerName = 'Owner name must be at least 3 characters long.';
    }

    if (!owner.contact || !contactRegex.test(owner.contact)) {
      errors.ownerContact = 'Owner contact number must be valid (10-digit number).';
    }

    if (!owner.email || !/\S+@\S+\.\S+/.test(owner.email)) {
      errors.ownerEmail = 'Please enter a valid email address for the owner.';
    }

    // Working hours validation (optional)
    for (const day in workingHours) {
      if (workingHours[day] && workingHours[day].trim().length < 3) {
        errors[`workingHours_${day}`] = `${day.charAt(0).toUpperCase() + day.slice(1)} hours must be at least 3 characters long.`;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddShop = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const token = sessionStorage.getItem('token'); // Get the JWT token

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass token in headers
        },
        body: JSON.stringify({ name, location, contact, image, workingHours, owner }), // Send shop data in request body
      });

      if (response.ok) {
        const data = await response.json();
        alert('Shop added successfully!');
        navigate('/admin/view-shops'); // Redirect to view shops after adding
      } else {
        const errorData = await response.json();
        console.error('Error details:', errorData); // Log the error details for debugging
        alert(`Failed to add shop: ${errorData || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('An error occurred while adding the shop.');
    }
  };

  return (
    <div className="add-shop-container">
      <h1>Add New Shop</h1>
      <form onSubmit={handleAddShop} className="add-shop-form">
        <div>
          <label>Shop Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          {formErrors.location && <p className="error">{formErrors.location}</p>}
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          {formErrors.contact && <p className="error">{formErrors.contact}</p>}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {formErrors.image && <p className="error">{formErrors.image}</p>}
        </div>

        {/* Owner Details */}
        <div>
          <label>Owner Name:</label>
          <input
            type="text"
            value={owner.name}
            onChange={(e) => setOwner({ ...owner, name: e.target.value })}
            required
          />
          {formErrors.ownerName && <p className="error">{formErrors.ownerName}</p>}
        </div>
        <div>
          <label>Owner Contact:</label>
          <input
            type="text"
            value={owner.contact}
            onChange={(e) => setOwner({ ...owner, contact: e.target.value })}
            required
          />
          {formErrors.ownerContact && <p className="error">{formErrors.ownerContact}</p>}
        </div>
        <div>
          <label>Owner Email:</label>
          <input
            type="email"
            value={owner.email}
            onChange={(e) => setOwner({ ...owner, email: e.target.value })}
            required
          />
          {formErrors.ownerEmail && <p className="error">{formErrors.ownerEmail}</p>}
        </div>

        {/* Working Hours */}
        <div>
          <label>Monday Hours:</label>
          <input
            type="text"
            value={workingHours.monday}
            onChange={(e) => setWorkingHours({ ...workingHours, monday: e.target.value })}
          />
          {formErrors.workingHours_monday && <p className="error">{formErrors.workingHours_monday}</p>}
        </div>
        <div>
          <label>Tuesday Hours:</label>
          <input
            type="text"
            value={workingHours.tuesday}
            onChange={(e) => setWorkingHours({ ...workingHours, tuesday: e.target.value })}
          />
          {formErrors.workingHours_tuesday && <p className="error">{formErrors.workingHours_tuesday}</p>}
        </div>
        <div>
          <label>Wednesday Hours:</label>
          <input
            type="text"
            value={workingHours.wednesday}
            onChange={(e) => setWorkingHours({ ...workingHours, wednesday: e.target.value })}
          />
          {formErrors.workingHours_wednesday && <p className="error">{formErrors.workingHours_wednesday}</p>}
        </div>
        <div>
          <label>Thursday Hours:</label>
          <input
            type="text"
            value={workingHours.thursday}
            onChange={(e) => setWorkingHours({ ...workingHours, thursday: e.target.value })}
          />
          {formErrors.workingHours_thursday && <p className="error">{formErrors.workingHours_thursday}</p>}
        </div>
        <div>
          <label>Friday Hours:</label>
          <input
            type="text"
            value={workingHours.friday}
            onChange={(e) => setWorkingHours({ ...workingHours, friday: e.target.value })}
          />
          {formErrors.workingHours_friday && <p className="error">{formErrors.workingHours_friday}</p>}
        </div>
        <div>
          <label>Saturday Hours:</label>
          <input
            type="text"
            value={workingHours.saturday}
            onChange={(e) => setWorkingHours({ ...workingHours, saturday: e.target.value })}
          />
          {formErrors.workingHours_saturday && <p className="error">{formErrors.workingHours_saturday}</p>}
        </div>
        <div>
          <label>Sunday Hours:</label>
          <input
            type="text"
            value={workingHours.sunday}
            onChange={(e) => setWorkingHours({ ...workingHours, sunday: e.target.value })}
          />
          {formErrors.workingHours_sunday && <p className="error">{formErrors.workingHours_sunday}</p>}
        </div>

        <button type="submit" className="add-shop-btn">Add Shop</button>
      </form>
    </div>
  );
};

export default AddShops;