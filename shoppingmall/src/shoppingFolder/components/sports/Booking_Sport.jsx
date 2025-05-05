import React, { useEffect, useState } from "react";
import { Calendar, Clock, Check, X } from "lucide-react";
import "../css/BookSlot.css";

const PORT = 5000;

const BookSlot = ({ sportId }) => {
    const [slotsByDate, setSlotsByDate] = useState({});
    const [expandedDate, setExpandedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [email, setEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bookingStatus, setBookingStatus] = useState(null);

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/sport/slots/${sportId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const email = await fetch(`${process.env.REACT_APP_API_URL}/user_get_mail`);
                if (!email.ok) {
                    throw new Error(`Error fetching email: ${email.statusText}`);
                }

                const emailData = await email.json();
                const userEmail = emailData.mail;
                setEmail(userEmail);

                // Group slots by date
                const groupedSlots = data.reduce((acc, slot) => {
                    const formattedDate = new Date(slot.date).toLocaleDateString();
                    if (!acc[formattedDate]) acc[formattedDate] = [];
                    acc[formattedDate].push({
                        id: slot._id,
                        slot: slot.slot,
                        isBooked: slot.is_booked,
                    });
                    return acc;
                }, {});
                setSlotsByDate(groupedSlots);
            } catch (error) {
                console.error("Error fetching available slots:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAvailableSlots();
    }, [sportId]);

    const handleBooking = async () => {
        if (!selectedSlot) return;
        
        setBookingStatus("processing");
        try {
            const token = sessionStorage.getItem("token");

            // Book the slot
            const bookingResponse = await fetch(`${process.env.REACT_APP_API_URL}/sport/booking/${selectedSlot}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ is_booked: true, email: email }),
            });

            if (!bookingResponse.ok) {
                throw new Error(`HTTP error! status: ${bookingResponse.status}`);
            }
            
            setSlotsByDate((prev) =>
                Object.fromEntries(
                    Object.entries(prev).map(([date, slots]) => [
                        date,
                        slots.map((slot) =>
                            slot.id === selectedSlot ? { ...slot, isBooked: true } : slot
                        ),
                    ])
                )
            );

            setBookingStatus("success");
            setTimeout(() => {
                setBookingStatus(null);
                setSelectedSlot(null);
            }, 3000);
        } catch (error) {
            console.error("Error during slot booking or wallet update:", error);
            setBookingStatus("error");
            setTimeout(() => {
                setBookingStatus(null);
            }, 3000);
        }
    };

    const handleSelectSlot = (slotId, isBooked) => {
        if (!isBooked) {
            setSelectedSlot(prevSelected => prevSelected === slotId ? null : slotId);
        }
    };

    if (isLoading) {
        return (
            <div className="bookslot-loading">
                <div className="bookslot-spinner"></div>
                <p>Loading available slots...</p>
            </div>
        );
    }

    return (
        <div className="bookslot-container">
            <div className="bookslot-header">
                <Calendar size={20} />
                <h3>Select Date & Time</h3>
            </div>

            {Object.keys(slotsByDate).length === 0 ? (
                <div className="no-slots-message">
                    <Clock size={32} />
                    <p>No available slots for this activity</p>
                    <span>Please check back later or try another activity</span>
                </div>
            ) : (
                <div className="dates-wrapper">
                    {Object.entries(slotsByDate).map(([date, slots]) => (
                        <div key={date} className="date-card">
                            <button
                                className={`date-toggle ${expandedDate === date ? 'date-expanded' : ''}`}
                                onClick={() => setExpandedDate(prev => prev === date ? null : date)}
                            >
                                <Calendar size={16} />
                                <span>{date}</span>
                                <div className={`toggle-indicator ${expandedDate === date ? 'expanded' : ''}`}>
                                    {expandedDate === date ? <X size={16} /> : <Check size={16} />}
                                </div>
                            </button>
                            
                            {expandedDate === date && (
                                <div className="slots-panel">
                                    <div className="time-slots-grid">
                                        {slots.map((slot) => (
                                            <button
                                                key={slot.id}
                                                className={`time-slot ${slot.isBooked ? 'booked' : ''} ${selectedSlot === slot.id ? 'selected' : ''}`}
                                                onClick={() => handleSelectSlot(slot.id, slot.isBooked)}
                                                disabled={slot.isBooked}
                                            >
                                                <Clock size={14} />
                                                <span>{slot.slot}</span>
                                                {slot.isBooked && <span className="booked-tag">Booked</span>}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {selectedSlot && (
                                        <div className="booking-action">
                                            <button 
                                                className={`book-button ${bookingStatus ? 'processing' : ''}`}
                                                onClick={handleBooking}
                                                disabled={bookingStatus === "processing"}
                                            >
                                                {bookingStatus === "processing" ? (
                                                    <>Processing<span className="dots"><span>.</span><span>.</span><span>.</span></span></>
                                                ) : bookingStatus === "success" ? (
                                                    <>Booked Successfully <Check size={16} /></>
                                                ) : bookingStatus === "error" ? (
                                                    <>Booking Failed <X size={16} /></>
                                                ) : (
                                                    <>Confirm Booking</>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookSlot;
