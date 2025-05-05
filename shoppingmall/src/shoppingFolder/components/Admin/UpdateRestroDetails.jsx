import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UpdateRestroDetail.css';

const UpdateRestroDetail = () => {
  const { id } = useParams();
  const [restro, setRestro] = useState(null);
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [errors, setErrors] = useState({ location: '', contact: '', ownerContact: '', ownerPassword: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/hotels/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch restaurant details');
        return response.json();
      })
      .then(data => {
        setRestro(data);
        setLocation(data.location || '');
        setContact(data.contact || '');
        setOwnerName(data.owner?.name || '');
        setOwnerEmail(data.owner?.email || '');
        setOwnerContact(data.owner?.contact || '');
      })
      .catch(error => console.error('Error fetching restaurant:', error));
  }, [id]);

  const validateForm = () => {
    const newErrors = { location: '', contact: '', ownerContact: '', ownerPassword: '' };
    let formIsValid = true;

    if (!location || location.length < 3) {
      newErrors.location = 'Location must be at least 3 characters long.';
      formIsValid = false;
    }

    const phonePattern = /^\+?\d{10,15}$/;
    if (contact && !phonePattern.test(contact)) {
      newErrors.contact = 'Contact must be a valid phone number.';
      formIsValid = false;
    }

    if (ownerContact && !phonePattern.test(ownerContact)) {
      newErrors.ownerContact = 'Owner contact must be a valid phone number.';
      formIsValid = false;
    }

    if (ownerPassword && ownerPassword.length < 6) {
      newErrors.ownerPassword = 'Owner password must be at least 6 characters.';
      formIsValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(formIsValid);
  };

  useEffect(() => {
    validateForm();
  }, [location, contact, ownerContact]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/hotels/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
          contact,
          owner: {
            name: ownerName,
            email: ownerEmail,
            contact: ownerContact,
            ...(ownerPassword ? { password: ownerPassword } : {})
          },
        }),
      });

      if (response.ok) {
        alert('Restaurant details updated successfully!');
        navigate('/admin/update-restro');
      } else {
        const errorData = await response.json();
        alert(`Update failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('An error occurred during update.');
    }
  };

  if (!restro) return <div>Loading...</div>;

  return (
    <div className="update-restro-container">
      <h1>Update Restaurant</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {errors.contact && <p className="error">{errors.contact}</p>}
        </div>
        <h2>Owner Details</h2>
        <div>
          <label>Owner Name:</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>
        <div>
          <label>Owner Email:</label>
          <input
            type="email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Owner Contact:</label>
          <input
            type="text"
            value={ownerContact}
            onChange={(e) => setOwnerContact(e.target.value)}
          />
          {errors.ownerContact && <p className="error">{errors.ownerContact}</p>}
        </div>
        <div>
          <label>Owner Password:</label>
          <input
            type="password"
            value={ownerPassword}
            onChange={(e) => setOwnerPassword(e.target.value)}
            placeholder="Leave blank to keep unchanged"
          />
          {errors.ownerPassword && <p className="error">{errors.ownerPassword}</p>}
        </div>
        <button type="submit" disabled={!isFormValid}>Update Restaurant</button>
      </form>
    </div>
  );
};

export default UpdateRestroDetail;
