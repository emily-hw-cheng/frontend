import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './roles/admin/AdminDashboard';
import GlobalMenuManager from './roles/admin/GlobalMenuManager';
import ManageFranchises from './roles/admin/ManageFranchises';
import ManageUsers from './roles/admin/ManageUsers';
import Reports from './roles/admin/Reports';
import SalesOverview from './roles/admin/SalesOverview';
import FranchiseDashboard from './roles/franchise/FranchiseDashboard';
import ViewSupplies from './roles/franchise/ViewSupplies';
import PlaceOrder from './roles/franchise/PlaceOrder';
import ViewMenuItems from './roles/franchise/ViewMenuItems';
import CustDashboard from './roles/customer/CustDashboard';
import Menu from './roles/customer/Menu';
import ToCart from './roles/customer/ToCart';
import CustPlaceOrder from './roles/customer/CustPlaceOrder';
import UserProfile from './roles/customer/UserProfile';
import FranchiseLeaderboard from './roles/customer/FranchiseLeaderboard';
import ViewOrders from './roles/customer/ViewOrders';
import { GlobalDataProvider } from './context/GlobalDataContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'leaflet/dist/leaflet.css';

function App() {
  // Clear localStorage on app load
  useEffect(() => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('franchiseId');
  }, []);

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  const franchiseId = localStorage.getItem('franchiseId'); // Get franchiseId for franchise routes

  return (
    <GlobalDataProvider>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/global-menu-manager" element={<GlobalMenuManager />} />
          <Route path="/admin/manage-franchises" element={<ManageFranchises />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/sales-overview" element={<SalesOverview />} />

          {/* Franchise Routes */}
          <Route path="/franchise/:franchiseId/dashboard" element={<FranchiseDashboard />} />
          <Route path="/franchise/:franchiseId/view-supplies" element={<ViewSupplies />} />
          <Route path="/franchise/:franchiseId/place-order" element={<PlaceOrder />} />
          <Route path="/franchise/:franchiseId/view-menu-items" element={<ViewMenuItems />} />

          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={<CustDashboard />} />
          <Route path="/customer/menu" element={<Menu />} />
          <Route path="/customer/to-cart" element={<ToCart />} />
          <Route path="/customer/place-order" element={<CustPlaceOrder />} />
          <Route path="/customer/user-profile" element={<UserProfile />} />
          <Route path="/customer/franchise-leaderboard" element={<FranchiseLeaderboard />} />
          <Route path="/customer/view-orders" element={<ViewOrders />} />
        </Routes>
      </Router>
    </GlobalDataProvider>
  );
}

export default App;