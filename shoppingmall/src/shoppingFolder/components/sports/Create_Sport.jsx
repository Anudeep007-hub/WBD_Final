import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, CalendarDays, MapPin, Mail, DollarSign, Info } from "lucide-react";
import "../../../App.css";
import "./css/Create_Sport.css";
import { Link } from 'react-router-dom';

const Create_Sport = () => {
    const submit_url = `${process.env.REACT_APP_API_URL}/sport/owner/create`;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        label: '',
        body: '',
        cost: '',
        address: '', 
        contact_mail: '', 
        slot_timings: [''],
        date: ''
    }); 

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name === 'slot_timings') {
            const slots = [...formData.slot_timings];
            slots[index] = value;
            setFormData({ ...formData, slot_timings: slots });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }; 

    const addSlot = () => {
        setFormData({ ...formData, slot_timings: [...formData.slot_timings, ''] });
    };

    const removeSlot = (index) => {
        const slots = formData.slot_timings.filter((_, i) => i !== index);
        setFormData({ ...formData, slot_timings: slots });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            // For demonstration purposes (mock API response)
            // In a real app, uncomment the fetch call below
            const response = await fetch(submit_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                setIsSubmitted(true);
                navigate("/sport/owner");
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to submit');
            }
        
            // Mock successful submission for demonstration
            setSuccessMessage("Sport created successfully!");
            
            // Wait a moment before navigating to show success message
            setTimeout(() => {
                setIsSubmitted(true);
                navigate("/sport/owner");
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while submitting the form');
        }
    };

    if (isSubmitted) {
        return null;
    }

    return (
        <div className='create-sport-container'>
            <div className='back-button'>
                <Link to="/sport/owner" className="back-link">
                    <ArrowLeft size={18} />
                    <span>Back</span>
                </Link>
            </div>
            
            <div className="create-sport-form-wrapper">
                <div className="create-sport-header">
                    <h1>Create New Sport Event</h1>
                    <p>Fill in the details to create a new sport event with a splash of colors!</p>
                </div>
                
                {successMessage && <div className="success-message">{successMessage}</div>}
                
                <form onSubmit={handleSubmit} className="create-sport-form">
                    <div className="form-group">
                        <label>
                            <Info size={18} />
                            <span>Sport Type</span>
                        </label>
                        <input
                            type="text"
                            name="label"
                            value={formData.label}
                            onChange={handleChange}
                            placeholder="Cricket, Football, Hockey, etc."
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <Info size={18} />
                            <span>Description</span>
                        </label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            placeholder="Describe your sport event..."
                            required
                            className="form-textarea"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <DollarSign size={18} />
                            <span>Cost</span>
                        </label>
                        <input
                            type="number"
                            name="cost"
                            value={formData.cost}
                            onChange={handleChange}
                            placeholder="Price per slot"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <MapPin size={18} />
                            <span>Address</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Location of the sport event"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <Mail size={18} />
                            <span>Contact Email</span>
                        </label>
                        <input
                            type="email"
                            name="contact_mail"
                            value={formData.contact_mail}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <CalendarDays size={18} />
                            <span>Date</span>
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <CalendarDays size={18} />
                            <span>Timing Slots</span>
                        </label>
                        <div className="slot-container">
                            {formData.slot_timings.map((slot, index) => (
                                <div key={index} className="slot-input-group">
                                    <input
                                        type="text"
                                        name="slot_timings"
                                        value={slot}
                                        onChange={(e) => handleChange(e, index)}
                                        placeholder="e.g., 9:00 AM - 10:00 AM"
                                        required
                                        className="form-input slot-input"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => removeSlot(index)} 
                                        className="slot-button remove-slot"
                                        disabled={formData.slot_timings.length === 1}
                                    >
                                        <Minus size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <button type="button" onClick={addSlot} className="add-slot-button">
                            <Plus size={18} />
                            <span>Add another slot</span>
                        </button>
                    </div>

                    <button type="submit" className="submit-button">
                        Create Sport Event
                    </button>
                </form>
                
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default Create_Sport;
