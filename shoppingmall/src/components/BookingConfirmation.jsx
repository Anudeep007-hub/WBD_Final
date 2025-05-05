import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, CalendarIcon, ClockIcon, UserIcon, PhoneIcon, MailIcon, UsersIcon, MapPinIcon, ArrowLeftIcon } from 'lucide-react';
import './css/bookingconfirmation.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="booking-confirmation error">
        <h2>No booking details found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeftIcon /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="booking-confirmation">
      <div className="confirmation-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeftIcon /> Back
        </button>
        <div className="success-icon">
          <CheckCircleIcon />
        </div>
        <h1>Booking Confirmed!</h1>
        <p>Your table has been successfully booked.</p>
      </div>

      <div className="booking-details">
        <h2>Booking Details</h2>
        <div className="details-grid">
          <div className="detail-item">
            <CalendarIcon />
            <div>
              <label>Date</label>
              <p>{new Date(booking.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="detail-item">
            <ClockIcon />
            <div>
              <label>Time</label>
              <p>{booking.startTime} - {booking.endTime}</p>
            </div>
          </div>

          <div className="detail-item">
            <UserIcon />
            <div>
              <label>Name</label>
              <p>{booking.customerName}</p>
            </div>
          </div>

          <div className="detail-item">
            <MailIcon />
            <div>
              <label>Email</label>
              <p>{booking.customerEmail}</p>
            </div>
          </div>

          <div className="detail-item">
            <PhoneIcon />
            <div>
              <label>Phone</label>
              <p>{booking.customerPhone}</p>
            </div>
          </div>

          <div className="detail-item">
            <UsersIcon />
            <div>
              <label>Number of Guests</label>
              <p>{booking.numberOfGuests}</p>
            </div>
          </div>

          <div className="detail-item">
            <MapPinIcon />
            <div>
              <label>Table</label>
              <p>{booking.table.name} ({booking.table.capacity} seats)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button onClick={() => navigate('/')} className="home-button">
          Back to Home
        </button>
        <button onClick={() => window.print()} className="print-button">
          Print Confirmation
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;