import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';


const getToken = () => {
  return localStorage.getItem('authToken'); // Get token from localStorage
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* Redux Provider */}
    <React.StrictMode>
      {/* Check if token is present in localStorage and automatically log in */}
      {getToken() ? <App /> : <App />} {/* If token exists, render App directly */}
    </React.StrictMode>
  </Provider>
);
/////////////////////////////////////////////////////////////////////////// The above is new one

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import { AuthProvider } from './middleware/AuthContext'; // Import the AuthProvider

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//   <React.StrictMode>
//       <App />
//   </React.StrictMode>
//   </Provider>,
// );
