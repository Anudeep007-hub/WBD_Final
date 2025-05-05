import React, { useState } from 'react';

function OwnerDashboard() {
  const [selectedRestaurent, setSelectedRestaurent] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleUpload = async () => {
    if (!image || !description || !date || !location) {
      alert('Please fill out all fields');
      return;
    }

    // Here we'll call the API to upload the promotion
    // For this example, let's assume we have a POST endpoint at '/api/upload-promotion'
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);

    try {
      const response = await fetch(`${process.env.API_URL}/api/upload-promotion`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Promotion uploaded successfully:', result);
    } catch (error) {
      console.error('Failed to upload promotion:', error);
      alert('Failed to upload promotion. Please try again.');
    }
  };

  return (
    <div>
      <h1>Owner Dashboard</h1>
      <div>
        <h2>Table Occupancy</h2>
        {/* Show table status (filled/empty) */}
      </div>
      
      {selectedRestaurent && (
        <div>
          <h2>Promotion Upload for {selectedRestaurent.name}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpload();
          }}>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button type="submit">Upload Promotion</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;