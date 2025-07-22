import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './roles/admin/Dashboard';
import { GlobalDataProvider } from './context/GlobalDataContext';
import ManageFranchises from './roles/admin/ManageFranchises';
import ManageUsers from './roles/admin/ManageUsers';
import GlobalMenuManager from './roles/admin/GlobalMenuManager';
import Reports from './roles/admin/Reports';
import SalesOverview from './roles/admin/SalesOverview';
import ViewSupplies from './roles/franchise/ViewSupplies';
import PlaceOrder from './roles/franchise/PlaceOrder';
import ViewMenuItems from './roles/franchise/ViewMenuItems';
import Login from './pages/Login';
import Register from './pages/Register';
import FranchiseDashboard from './roles/franchise/FranchiseDashboard';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  return (
    <GlobalDataProvider>
      <Router>
        <Routes>
          {/* Redirect "/" to "/login" if not authenticated */}
          <Route path="/" element={<Navigate to={isAuthenticated ? `/${userRole}/dashboard` : '/login'} />} />
          

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin/manage-franchises" element={isAuthenticated && userRole === 'admin' ? <ManageFranchises /> : <Navigate to="/login" />} />
          <Route path="/admin/manage-users" element={isAuthenticated && userRole === 'admin' ? <ManageUsers /> : <Navigate to="/login" />} />
          <Route path="/admin/global-menu-manager" element={isAuthenticated && userRole === 'admin' ? <GlobalMenuManager /> : <Navigate to="/login" />} />
          <Route path="/admin/reports" element={isAuthenticated && userRole === 'admin' ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/admin/sales-overview" element={isAuthenticated && userRole === 'admin' ? <SalesOverview /> : <Navigate to="/login" />} />

          {/* Franchise Routes */}
          <Route path="/franchise/dashboard" element={isAuthenticated && userRole === 'franchise' ? <FranchiseDashboard /> : <Navigate to="/login" />} />
          <Route path="/franchise/view-supplies" element={isAuthenticated && userRole === 'franchise' ? <ViewSupplies /> : <Navigate to="/login" />} />
          <Route path="/franchise/place-order" element={isAuthenticated && userRole === 'franchise' ? <PlaceOrder /> : <Navigate to="/login" />} />
          <Route path="/franchise/view-menu-items" element={isAuthenticated && userRole === 'franchise' ? <ViewMenuItems /> : <Navigate to="/login" />} />

          {/* Customer Routes */}
          <Route path="/customer/home" element={isAuthenticated && userRole === 'customer' ? <ViewMenuItems /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </GlobalDataProvider>
  );
}

export default App;