

// import React, { useState, useEffect } from "react";
// import "../css/BookingDetails.css";
// import { Download } from "lucide-react";

// const BookingDetails = () => {
//     const [userBookings, setUserBookings] = useState([]);
//     const [restaurantBookings, setRestaurantBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [email, setEmail] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch user email
//                 const emailResponse = await fetch("${process.env.REACT_APP_API_URL}/user_get_mail");
//                 if (!emailResponse.ok) throw new Error("Failed to fetch email.");
//                 const emailData = await emailResponse.json();
//                 const userEmail = emailData.mail;
//                 setEmail(userEmail);

//                 // Fetch user bookings
//                 const userBookingsResponse = await fetch("${process.env.REACT_APP_API_URL}/get_user_bookings", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ email: userEmail }),
//                 });

//                 if (!userBookingsResponse.ok) throw new Error("Failed to fetch user bookings.");
//                 const userBookingsData = await userBookingsResponse.json();
//                 setUserBookings(userBookingsData.bookings || []);

//                 // Fetch restaurant bookings
//                 const restaurantBookingsResponse = await fetch("${process.env.REACT_APP_API_URL}/get_restaurant_bookings");
//                 if (!restaurantBookingsResponse.ok) throw new Error("Failed to fetch restaurant bookings.");
//                 const restaurantBookingsData = await restaurantBookingsResponse.json();

//                 // Validate restaurant bookings response
//                 if (restaurantBookingsData && Array.isArray(restaurantBookingsData.bookings)) {
//                     setRestaurantBookings(restaurantBookingsData.bookings);
//                 } else {
//                     console.warn("Unexpected restaurant bookings response format.");
//                     setRestaurantBookings([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const downloadDetails = (booking) => {
//         const bookingDetails = `
//         Booking Details:
//         -----------------
//         Label: ${booking.label || 'N/A'}
//         Address: ${booking.address || 'N/A'}
//         Cost: ₹${booking.cost || 'N/A'}
//         Date of Booking: ${booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
//         Slot: ${booking.slot || 'N/A'}
//         Contact Email: ${booking.contact_mail || 'N/A'}
//         User Email: ${email || 'N/A'}
//         `;
//         const blob = new Blob([bookingDetails], { type: "text/plain" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = `booking-${booking._id || Date.now()}.txt`;
//         link.click();
//     };

//     const downloadDetailsR = (booking) => {
//         const bookingDetails = `
//         Booking Details:
//         -----------------
//         Name: ${booking.name || 'N/A'}
//         TableID: ${booking.tableId || 'N/A'}
//         Email: ${booking.email || 'N/A'}
//         Date of Booking: ${booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
//         Mobile: ${booking.phone || 'N/A'}
//         `;
//         const blob = new Blob([bookingDetails], { type: "text/plain" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = `booking-${booking._id || Date.now()}.txt`;
//         link.click();
//     };

//     return (
//         <div className="booking-details-container">
//             {loading ? (
//                 <div className="booking-details-loading">
//                     <div className="booking-spinner"></div>
//                     <p>Loading your bookings...</p>
//                 </div>
//             ) : (
//                 <>
//                     {/* User Bookings Section */}
//                     <div>
//                         <h4>Sport Bookings</h4>
//                         <div className="booking-list">
//                             {userBookings && userBookings.length > 0 ? (
//                                 userBookings.map((booking, index) => (
//                                     <div key={index} className="ticket-container">
//                                         <div className="ticket">
//                                             <h4>{booking.label || 'Sport Booking'}</h4>
//                                             <p><strong>Date:</strong> {booking.date ? new Date(booking.date).toLocaleDateString() : 'No date'}</p>
//                                             <p><strong>Slot:</strong> {booking.slot || 'No slot information'}</p>
//                                             <p><strong>Address:</strong> {booking.address || 'No address'}</p>
//                                             <p><strong>Cost:</strong> ₹{booking.cost || '0'}</p>
//                                             <button onClick={() => downloadDetails(booking)} className="download-button">
//                                                 <Download size={16} />
//                                                 Download Ticket
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No sport bookings found.</p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Restaurant Bookings Section */}
//                     <div>
//                         <h4>Restaurant Bookings</h4>
//                         <div className="booking-list">
//                             {restaurantBookings && restaurantBookings.length > 0 ? (
//                                 restaurantBookings.map((booking, index) => (
//                                     <div key={index} className="ticket-container">
//                                         <div className="ticket" data-id={booking.tableId || booking._id}>
//                                             <h4>{booking.name || 'Restaurant Booking'}</h4>
//                                             <p><strong>Date:</strong> {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'No date'}</p>
//                                             <p><strong>Name:</strong> {booking.name || 'No name'}</p>
//                                             <p><strong>Phone:</strong> {booking.phone || 'No phone'}</p>
//                                             <p><strong>Table ID:</strong> {booking.tableId || 'No table'}</p>
//                                             <button onClick={() => downloadDetailsR(booking)} className="download-button">
//                                                 <Download size={16} />
//                                                 Download Ticket
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No restaurant bookings found.</p>
//                             )}
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default BookingDetails;



import React, { useState, useEffect } from "react";
import "../css/BookingDetails.css";
import { Download } from "lucide-react";

const BookingDetails = () => {
    const [userBookings, setUserBookings] = useState([]);
    const [restaurantBookings, setRestaurantBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user email
                const emailResponse = await fetch(`${process.env.REACT_APP_API_URL}/user_get_mail`);
                if (!emailResponse.ok) throw new Error("Failed to fetch email.");
                const emailData = await emailResponse.json();
                const userEmail = emailData.mail;
                setEmail(userEmail);

                // Fetch user bookings (sports)
                const userBookingsResponse = await fetch(`${process.env.REACT_APP_API_URL}/get_user_bookings`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: userEmail }),
                });

                if (!userBookingsResponse.ok) throw new Error("Failed to fetch user bookings.");
                const userBookingsData = await userBookingsResponse.json();
                setUserBookings(userBookingsData.bookings || []);

                // Fetch restaurant bookings
                const restaurantBookingsResponse = await fetch(`${process.env.REACT_APP_API_URL}/get_restaurant_bookings`);
                if (!restaurantBookingsResponse.ok) throw new Error("Failed to fetch restaurant bookings.");
                const restaurantBookingsData = await restaurantBookingsResponse.json();

                // Validate restaurant bookings response
                if (restaurantBookingsData && Array.isArray(restaurantBookingsData.bookings)) {
                    setRestaurantBookings(restaurantBookingsData.bookings);
                } else {
                    console.warn("Unexpected restaurant bookings response format.");
                    setRestaurantBookings([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const downloadDetails = (booking) => {
        const bookingDetails = `
        Booking Details:
        -----------------
        Label: ${booking.label || 'N/A'}
        Address: ${booking.address || 'N/A'}
        Cost: ₹${booking.cost || 'N/A'}
        Date of Booking: ${booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
        Slot: ${booking.slot || 'N/A'}
        Contact Email: ${booking.contact_mail || 'N/A'}
        User Email: ${email || 'N/A'}
        `;
        const blob = new Blob([bookingDetails], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `booking-${booking._id || Date.now()}.txt`;
        link.click();
    };

    const downloadDetailsR = (booking) => {
        const bookingDetails = `
        Booking Details:
        -----------------
        Name: ${booking.name || 'N/A'}
        TableID: ${booking.tableId || 'N/A'}
        Email: ${booking.email || 'N/A'}
        Date of Booking: ${booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
        Mobile: ${booking.phone || 'N/A'}
        `;
        const blob = new Blob([bookingDetails], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `booking-${booking._id || Date.now()}.txt`;
        link.click();
    };

    return (
        <div className="booking-details-container">
            {loading ? (
                <div className="booking-details-loading">
                    <div className="booking-spinner"></div>
                    <p>Loading your bookings...</p>
                </div>
            ) : (
                <>
                    {/* User Bookings Section */}
                    <div>
                        <h4>Sport Bookings</h4>
                        <div className="booking-list">
                            {userBookings && userBookings.length > 0 ? (
                                userBookings.map((booking, index) => (
                                    <div key={index} className="ticket-container">
                                        <div className="ticket">
                                            <h4>{booking.label || 'Sport Booking'}</h4>
                                            <p><strong>Date:</strong> {booking.date ? new Date(booking.date).toLocaleDateString() : 'No date'}</p>
                                            <p><strong>Slot:</strong> {booking.slot || 'No slot information'}</p>
                                            <p><strong>Address:</strong> {booking.address || 'No address'}</p>
                                            <p><strong>Cost:</strong> ₹{booking.cost || '0'}</p>
                                            <button onClick={() => downloadDetails(booking)} className="download-button">
                                                <Download size={16} />
                                                Download Ticket
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No sport bookings found.</p>
                            )}
                        </div>
                    </div>

                    {/* Restaurant Bookings Section */}
                    <div>
                        <h4>Restaurant Bookings</h4>
                        <div className="booking-list">
                            {restaurantBookings && restaurantBookings.length > 0 ? (
                                restaurantBookings.map((booking, index) => (
                                    <div key={index} className="ticket-container">
                                        <div className="ticket" data-id={booking.tableId || booking._id}>
                                            <h4>{booking.name || 'Restaurant Booking'}</h4>
                                            <p><strong>Date:</strong> {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'No date'}</p>
                                            <p><strong>Name:</strong> {booking.name || 'No name'}</p>
                                            <p><strong>Phone:</strong> {booking.phone || 'No phone'}</p>
                                            <p><strong>Table ID:</strong> {booking.tableId || 'No table'}</p>
                                            <button onClick={() => downloadDetailsR(booking)} className="download-button">
                                                <Download size={16} />
                                                Download Ticket
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No restaurant bookings found.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookingDetails;