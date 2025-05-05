import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/Updaterestaurants.css';
import mall from '../images/background3.png';

const UpdateRestro = () => {
    const [restros, setRestros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchRestros();
    }, []);

    const fetchRestros = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hotels`);
            if (!response.ok) {
                throw new Error('Failed to fetch restraunts');
            }
            const data = await response.json();

            // Check if data is an array and contains required fields
            if (Array.isArray(data)) {
                const validRestros = data.filter(
                    restro => restro._id && restro.name && restro.location
                ); // Filter out invalid entries
                setRestros(validRestros);
            } else {
                throw new Error('Unexpected data format');
            }
        } catch (error) {
            console.error('Error fetching restraunts:', error);
            setError('Could not load restaurants. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (restroId) => {
        navigate(`/admin/update-restro/${restroId}`);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (restros.length === 0) {
        return <div className="no-restros-message">No restaurants available to display.</div>;
    }

    return (
        <div className="restro-list">
            <h1>Restaurants</h1>
            {restros.map(restro => (
                <div key={restro._id} className="restro-item">
                    {/* restro image */}
                    <img src={mall} alt={restro.name} className="restro-image" />
                    {/* restro details */}
                    <div className="restro-info">
                        <h2>{restro.name}</h2>
                        <p>{restro.location}</p>
                        {restro.contact && <p>{restro.contact}</p>}
                        <button onClick={() => handleUpdate(restro._id)}>Update</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UpdateRestro;
