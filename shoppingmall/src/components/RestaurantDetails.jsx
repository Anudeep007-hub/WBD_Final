// import React from 'react';
// import { useParams } from 'react-router-dom';

// function RestaurentDetails() {
//   const { id } = useParams();

//   const [tables, setTables] = React.useState([]);

//   React.useEffect(() => {
//     const fetchTables = async () => {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get-tables/${id}`);
//       const result = await response.json();
//       setTables(result);
//     };
//     fetchTables();
//   }, [id]);

//   if (!tables.length) {
//     return <p>Loading tables...</p>;
//   }

//   return (
//     <div>
//       <h1>{tables[0].name}</h1>
//       <p>{tables[0].description}</p>
//       <p><strong>Cuisine:</strong> {tables[0].cuisine}</p>
//       <p><strong>Price Range:</strong> {tables[0].price}</p>
//       <p><strong>Dietary Options:</strong> {tables[0].dietary}</p>
//       <p><strong>Seating Type:</strong> {tables[0].seating}</p>
//       <h2>Tables</h2>
//       <ul>
//         {tables.map((table) => (
//           <li key={table._id}>{table.name} ({table.capacity})</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default RestaurentDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import { FaUtensils, FaDollarSign, FaLeaf, FaChair, FaUsers } from 'react-icons/fa';

function RestaurantDetails() {
  const { id } = useParams();
  const [tables, setTables] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get-tables/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant details');
        }
        const result = await response.json();
        setTables(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTables();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!tables.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No restaurant details available.</p>
      </div>
    );
  }

  const restaurant = tables[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{restaurant.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{restaurant.description}</p>
            
            {/* Restaurant Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <FaUtensils className="text-blue-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Cuisine</p>
                  <p className="font-medium">{restaurant.cuisine}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaDollarSign className="text-green-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Price Range</p>
                  <p className="font-medium">{restaurant.price}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaLeaf className="text-emerald-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Dietary Options</p>
                  <p className="font-medium">{restaurant.dietary}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaChair className="text-purple-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Seating Type</p>
                  <p className="font-medium">{restaurant.seating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tables.map((table) => (
                <div
                  key={table._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{table.name}</h3>
                    <div className="flex items-center text-gray-600">
                      <FaUsers className="mr-2" />
                      <span>{table.capacity}</span>
                    </div>
                  </div>
                  <button className="w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                    Reserve Table
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;