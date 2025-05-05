// import { useState, useEffect } from "react";
// import "./css/UserWallet.css";
// import { User, Wallet, Upload, Lock, Mail, Book } from "lucide-react";

// const BookingDetails = ({ email }) => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!email) return;
      
//       try {
//         const response = await fetch("${process.env.REACT_APP_API_URL}/get_user_bookings", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setBookings(data.bookings || []);
//         } else {
//           console.error("Failed to fetch bookings");
//         }
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [email]);

//   if (loading) return <p>Loading your bookings...</p>;

//   return (
//     <div className="bookings-list">
//       {bookings.length > 0 ? (
//         bookings.map((booking, index) => (
//           <div key={index} className="booking-item">
//             <div className="booking-header">
//               <Book size={18} />
//               <h4>{booking.type || "Booking"}</h4>
//             </div>
//             <div className="booking-details">
//               <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
//               <p><strong>Time:</strong> {booking.time || "N/A"}</p>
//               {booking.location && <p><strong>Location:</strong> {booking.location}</p>}
//               {booking.seats && <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>}
//               {booking.status && (
//                 <span className={`booking-status ${booking.status.toLowerCase()}`}>
//                   {booking.status}
//                 </span>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="no-bookings">You don't have any bookings yet.</p>
//       )}
//     </div>
//   );
// };

// const UserWallet = () => {
//   const [email, setEmail] = useState(null);
//   const [details, setDetails] = useState(null);
//   const [image, setImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch email and user details
//   useEffect(() => {
//     const fetchEmailAndDetails = async () => {
//       try {
//         const emailResponse = await fetch("${process.env.REACT_APP_API_URL}/user_get_mail");
//         const emailData = await emailResponse.json();
//         const userEmail = emailData.mail;
//         setEmail(userEmail);

//         const detailsResponse = await fetch("${process.env.REACT_APP_API_URL}/get_user_details", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email: userEmail }),
//         });

//         const userDetails = await detailsResponse.json();
//         setDetails(userDetails);
//         setImage(userDetails.image);
//       } catch (error) {
//         console.error("Error fetching details:", error);
//         setError("Failed to load user profile. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchEmailAndDetails();
//   }, []);

//   // Handle Image Upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("email", email);

//     try {
//       const response = await fetch("${process.env.REACT_APP_API_URL}/upload_profile_image", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Error uploading image.");
//       }

//       const data = await response.json();
//       setImage(data.imagePath);
//     } catch (error) {
//       console.error("Image upload error:", error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="user-wallet-loading">
//         <div className="loading-animation"></div>
//         <p>Loading your profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="user-wallet-error">
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="user-wallet-page">
//       <div className="user-wallet-container">
//         <div className="user-wallet-header">
//           <User size={24} />
//           <h1>My Profile</h1>
//         </div>

//         <div className="user-profile-section">
//           <div className="profile-image-section">
//             <div className="profile-image-container">
//               {image ? (
//                 <img src={`${process.env.REACT_APP_API_URL}${image}`} alt="Profile" />
//               ) : (
//                 <div className="profile-image-placeholder">
//                   <User size={40} />
//                 </div>
//               )}
              
//               {selectedImage && (
//                 <div className="image-preview">
//                   <img src={selectedImage} alt="Preview" />
//                 </div>
//               )}
//             </div>
            
//             <div className="image-upload-container">
//               <label htmlFor="profile-image-upload" className="upload-button">
//                 <Upload size={16} />
//                 <span>Upload Photo</span>
//               </label>
//               <input
//                 id="profile-image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//             </div>
//           </div>

//           <div className="user-details-section">
//             <div className="user-name">
//               <h2>{details?.name || "User"}</h2>
//               {details?.memberSince && (
//                 <p className="member-since">Member since {new Date(details.memberSince).getFullYear()}</p>
//               )}
//             </div>
            
//             <div className="user-info-card">
//               <div className="info-item">
//                 <Mail size={18} />
//                 <div>
//                   <p className="info-label">Email</p>
//                   <p className="info-value">{email || "Not available"}</p>
//                 </div>
//               </div>
              
//               {details?.phone && (
//                 <div className="info-item">
//                   <Lock size={18} />
//                   <div>
//                     <p className="info-label">Phone</p>
//                     <p className="info-value">{details.phone}</p>
//                   </div>
//                 </div>
//               )}
              
//               {details?.points !== undefined && (
//                 <div className="info-item">
//                   <Wallet size={18} />
//                   <div>
//                     <p className="info-label">Reward Points</p>
//                     <p className="info-value points">{details.points}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="user-bookings-section">
//           <div className="section-header">
//             <Book size={20} />
//             <h2>My Bookings</h2> 
//           </div>
//           <BookingDetails email={email} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserWallet;


import { useState, useEffect } from "react";
import "./css/UserWallet.css";
import { User, Wallet, Upload, Lock, Mail, Book } from "lucide-react";
import UserBookedDetails from "./UserBookedDetails"; // Import UserBookedDetails

const UserWallet = () => {
  const [email, setEmail] = useState(null);
  const [details, setDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch email and user details
  useEffect(() => {
    const fetchEmailAndDetails = async () => {
      try {
        const emailResponse = await fetch(`${process.env.REACT_APP_API_URL}/user_get_mail`);
        const emailData = await emailResponse.json();
        const userEmail = emailData.mail;
        setEmail(userEmail);

        const detailsResponse = await fetch(`${process.env.REACT_APP_API_URL}/get_user_details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });

        const userDetails = await detailsResponse.json();
        setDetails(userDetails);
        setImage(userDetails.image);
      } catch (error) {
        console.error("Error fetching details:", error);
        setError("Failed to load user profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailAndDetails();
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", email);

    try {
      const response = await fetch(`${process.env.REACT_APP_REACT_APP_API_URL}/upload_profile_image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading image.");
      }

      const data = await response.json();
      setImage(data.imagePath);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="user-wallet-loading">
        <div className="loading-animation"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-wallet-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="user-wallet-page">
      <div className="user-wallet-container">
        <div className="user-wallet-header">
          <User size={24} />
          <h1>My Profile</h1>
        </div>

        <div className="user-profile-section">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {image ? (
                <img src={`${process.env.REACT_APP_REACT_APP_API_URL}${image}`} alt="Profile" />
              ) : (
                <div className="profile-image-placeholder">
                  <User size={40} />
                </div>
              )}
              
              {selectedImage && (
                <div className="image-preview">
                  <img src={selectedImage} alt="Preview" />
                </div>
              )}
            </div>
            
            <div className="image-upload-container">
              <label htmlFor="profile-image-upload" className="upload-button">
                <Upload size={16} />
                <span>Upload Photo</span>
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="user-details-section">
            <div className="user-name">
              <h2>{details?.name || "User"}</h2>
              {details?.memberSince && (
                <p className="member-since">Member since {new Date(details.memberSince).getFullYear()}</p>
              )}
            </div>
            
            <div className="user-info-card">
              <div className="info-item">
                <Mail size={18} />
                <div>
                  <p className="info-label">Email</p>
                  <p className="info-value">{email || "Not available"}</p>
                </div>
              </div>
              
              {details?.phone && (
                <div className="info-item">
                  <Lock size={18} />
                  <div>
                    <p className="info-label">Phone</p>
                    <p className="info-value">{details.phone}</p>
                  </div>
                </div>
              )}
              
              {details?.points !== undefined && (
                <div className="info-item">
                  <Wallet size={18} />
                  <div>
                    <p className="info-label">Reward Points</p>
                    <p className="info-value points">{details.points}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="user-bookings-section">
          <div className="section-header">
            <Book size={20} />
            <h2>My Bookings</h2> 
          </div>
          <UserBookedDetails /> {/* Use UserBookedDetails component */}
        </div>
      </div>
    </div>
  );
};

export default UserWallet;