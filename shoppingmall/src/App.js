import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Header from './shoppingFolder/components/Header';
import Login from './shoppingFolder/components/Login/Login';
import Signup from './shoppingFolder/components/Signup/Signup';
import Body from './shoppingFolder/components/Body.jsx';
import ManagerLogin from './shoppingFolder/components/Login/ManagerLogin.jsx';
import ShopOwnerLogin from './shoppingFolder/components/Login/ShopOwnerLogin.jsx';
import ShopsList from './shoppingFolder/components/Sholist';
import Deals from './shoppingFolder/components/Deals';
import Event from './shoppingFolder/components/Event';
import Footer from './shoppingFolder/components/Footer';
import AdminDashboard from './shoppingFolder/components/AdminDashboard.jsx';
import AddShops from './shoppingFolder/components/Admin/AddShops.jsx';
import AddTables from './shoppingFolder/components/Admin/AddTables.jsx';
import AddShopOwner from './shoppingFolder/components/Admin/AddShopOwner.jsx';
import UpdateShopOwner from './shoppingFolder/components/Admin/UpdateShopOwner.jsx';
import UpdateRestroOwner from './shoppingFolder/components/Admin/UpdateRestroOwner.jsx';
import UpdateShopDetail from './shoppingFolder/components/Admin/UpdateShopDetail.jsx';
import UpdateRestroDetails from './shoppingFolder/components/Admin/UpdateRestroDetails.jsx';
import UpdateShop from './shoppingFolder/components/Admin/UpdateShop.jsx';
import UpdateRestro from './shoppingFolder/components/Admin/UpdateRestro.jsx';
import ViewShopOwners from './shoppingFolder/components/Admin/ViewShopOwners.jsx';
import AddManagers from './shoppingFolder/components/Admin/AddManagers.jsx';
import AdminDashboard2 from './shoppingFolder/components/AdminDashBoard2.jsx';
import SomeShops from './shoppingFolder/components/SomeShops.jsx';
// import ViewShops from './shoppingFolder/components/Admin/ViewShops.jsx';
import ShopOwnerDashboard from './shoppingFolder/components/shopowner/dashboard.jsx';
import Viewdeals from './shoppingFolder/components/shopowner/viewdeals.jsx';
import AddDeals from './shoppingFolder/components/shopowner/AddDeals.jsx';
import AddRestro from './shoppingFolder/components/Admin/AddRestro.jsx';
import ViewShopDetails from './shoppingFolder/components/shopowner/ViewShopDetails.jsx';
import UpdateDeals from './shoppingFolder/components/shopowner/UpdateDeals.jsx';
import UpdateDealDetail from './shoppingFolder/components/shopowner/UpdateDealDetail.jsx';
import ViewShops from './shoppingFolder/components/Admin/ViewShops.jsx';
import ShopOwnerProfile from './shoppingFolder/components/shopowner/ShopOwnerProfile.jsx';
//Sports Section
import Sport_TopBar from './shoppingFolder/components/sports/Sport_TopBar.jsx';
import Create_Sport from './shoppingFolder/components/sports/Create_Sport.jsx';
import Show_Sport from './shoppingFolder/components/sports/Show_Sport.jsx';
import FAQ from './shoppingFolder/components/FAQ.jsx';
import SportDashboard2 from './shoppingFolder/components/sports/SportDashboard2.jsx';
import AboutUs from './shoppingFolder/components/AboutUs.jsx';
import StickyHeader from "./shoppingFolder/components/Feedback/header.js";
import Feedback from './shoppingFolder/components/Feedback.jsx';
import Submissions from './shoppingFolder/components/Feedback/submissions.js'
import ViewFeedback from './shoppingFolder/components/Admin/ViewFeedback.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResHome from './pages/RestaurantHome';
import Restaurants from './pages/Restaurants';
// import ResAuthProvider from './context/AuthContext';
import ResTableList from './components/TablesList';
import ResBookingPage from './components/BookingPage';
import ResBookingConfirmation from './components/BookingConfirmation';
import RestroManager from './shoppingFolder/components/restaurant/RestroManager.jsx';
//User wallet 
import UserWallet from './shoppingFolder/components/Userwallet/UserWallet.jsx';



// Component to check if user is authenticated
const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

const ProtectedRouteAdmin = ({ element }) => {
  const token = sessionStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Assuming user data is stored in localStorage
  if (!token || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return element;
};

const ProtectedRouteshopowner = ({ element }) => {
  const token = sessionStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Assuming user data is stored in localStorage
  if (!token || userRole !== 'shopowner') {
    return <Navigate to="/shopowner-login" replace />;
  }
  return element;
};

const ProtectedRoutesports = ({ element }) => {
  const token = sessionStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Assuming user data is stored in localStorage
  return element; // No restriction for sports role
};

const ProtectedRouteTheatre = ({ element }) => {
  const token = sessionStorage.getItem('token');
  const section = JSON.parse(localStorage.getItem('user'))?.section;
  return element; // No restriction for theatre section
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/bookrestaurant/" element={<ResHome />} />

          {/* Protected Routes */}
          <Route path="/bookrestaurant/restaurants" element={<Restaurants darkMode={darkMode} />} />
          <Route path="/bookrestaurant/restaurants/:hotelId" element={<ResTableList />} />
          <Route path="/bookrestaurant/restaurants/:hotelId/tables/:tableId" element={<ResBookingPage />} />
          <Route path="/bookrestaurant/confirmation" element={<ResBookingConfirmation />} />

          {/* Non-protected Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />          <Route path="/manager-login" element={<ManagerLogin />} />
          <Route path="/shopowner-login" element={<ShopOwnerLogin />} />
          {/* Protect the home page ("/") and other pages that require authentication */}
          <Route path="/shoplist" element={<ProtectedRoute element={<ViewShops />} />} />
          <Route path="/deals" element={<ProtectedRoute element={<Deals />} />} />
          <Route path="/event" element={<ProtectedRoute element={<Event />} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute element={

                <Body />

              }
              />}
          />
          <Route path="/booksports" element={<ProtectedRoute element={<Show_Sport />} />} />

          <Route path="/admin/dashboard" element={<ProtectedRouteAdmin element={<AdminDashboard />} />} />
          <Route path="/admin/dashboard2" element={<ProtectedRouteAdmin element={<AdminDashboard2 />} />} />
          <Route path="/admin/add-shop" element={<ProtectedRouteAdmin element={<AddShops />} />} />
          <Route path="/admin/add-restro" element={<ProtectedRouteAdmin element={<AddRestro />} />} />
          <Route path="/admin/add-tables" element={<ProtectedRouteAdmin element={<AddTables />} />} />
          <Route path="/admin/update-shop" element={<ProtectedRouteAdmin element={<UpdateShop />} />} />
          <Route path="/admin/update-restro" element={<ProtectedRouteAdmin element={<UpdateRestro />} />} />
          <Route path="/admin/add-shopowners" element={<ProtectedRouteAdmin element={<AddShopOwner />} />} />
          <Route path="/admin/update-shopowners" element={<ProtectedRouteAdmin element={<UpdateShopOwner />} />} />
          <Route path="admin/update-shop/:id" element={<ProtectedRouteAdmin element={<UpdateShopDetail />} />} />
          <Route path="/admin/update-restroowners" element={<ProtectedRouteAdmin element={<UpdateRestroOwner />} />} />
          <Route path="admin/update-restro/:id" element={<ProtectedRouteAdmin element={<UpdateRestroDetails />} />} />
          <Route path="/admin/view-shops" element={<ProtectedRouteAdmin element={<ViewShops />} />} />
          <Route path="/admin/view-shopowners" element={<ProtectedRouteAdmin element={<ViewShopOwners />} />} />
          <Route path="/admin/add-manager" element={<ProtectedRouteAdmin element={<AddManagers />} />} />
          <Route path="/admin/viewFeedback" element={<ProtectedRouteAdmin element={<ViewFeedback />} />} />
          <Route path="/shopowner/dashboard" element={<ShopOwnerDashboard />} />
          <Route path="/shopowner/view-deals" element={<Deals />} />
          <Route path="/shopowner/add-deals" element={<AddDeals />} />
          <Route path="/shopowner/view-shop-details" element={<ViewShopDetails />} />
          <Route path="/shopowner/update-deals" element={<UpdateDeals />} />
          <Route path="/shopowner/update-deals:id" element={<UpdateDealDetail />} />
          <Route path="/shopowner/profile" element={<ShopOwnerProfile />} />
          
          <Route path='/sport/owner' element={<ProtectedRoutesports element={
            <><Sport_TopBar isOwner={true} /><SportDashboard2 isOwner={true} /><Show_Sport isOwner={true} />
            </>} />}
          />
          <Route path='/sport/user' element={<ProtectedRoute element={
            <><Sport_TopBar isOwner={false} /><Show_Sport isOwner={false} />
            </>} />}
          />
          <Route path='/sport/owner/create' element={<ProtectedRoutesports element={<Create_Sport />} />} />

          <Route path='/restro/owner' element={<ProtectedRoutesports element={
            <><Sport_TopBar isOwner={true} /><SportDashboard2 isOwner={true} /><Show_Sport isOwner={true} />
            </>} />}
          />
          <Route path='/restro/user' element={<ProtectedRoute element={
            <><Sport_TopBar isOwner={false} /><Show_Sport isOwner={false} />
            </>} />}
          />
          <Route path='/restro/owner/create' element={<ProtectedRoutesports element={<Create_Sport />} />} />

          <Route path="/FAQ" element={<ProtectedRoute element={<FAQ />} />} />
          <Route path='/AboutUs' element={<ProtectedRoute element={<AboutUs />} />} />
          <Route path='/user/wallet' element={<ProtectedRoute element={<UserWallet />} />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/submission/:id" element={<Submissions />} />
          <Route
            path="/theatre/manager"
            element={<div><h1>Welcome Theatre Manager</h1><Link to="http://localhost:3001/admin">Go to DashBoard</Link></div>}
          />

        </Routes>


        <Footer />
      </div>

    </Router>
    // </GoogleOAuthProvider>
  );
}

export default App;
