import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UpdateShopDetail.css'; // Import the CSS file

const UpdateShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [errors, setErrors] = useState({ location: '', contact: '', ownerContact: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch shop details
    fetch(`${process.env.REACT_APP_API_URL}/api/a/shops/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch shop details');
        return response.json();
      })
      .then(data => {
        setShop(data);
        setLocation(data.location || '');
        setContact(data.contact || '');
        setOwnerName(data.owner?.name || '');
        setOwnerEmail(data.owner?.email || '');
        setOwnerContact(data.owner?.contact || '');
      })
      .catch(error => console.error('Error fetching shop:', error));
  }, [id]);

  const validateForm = () => {
    const newErrors = { location: '', contact: '', ownerContact: '' };
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/a/shops/${id}`, {
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
          },
        }),
      });

      if (response.ok) {
        alert('Shop updated successfully!');
        navigate('/admin/update-shop');
      } else {
        const errorData = await response.json();
        alert(`Update failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('An error occurred during update.');
    }
  };

  if (!shop) return <div>Loading...</div>;

  return (
    <div className="update-shop-container">
      <h1>Update Shop</h1>
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
        <button type="submit" disabled={!isFormValid}>Update Shop</button>
      </form>
    </div>
  );
};

export default UpdateShopDetail;
