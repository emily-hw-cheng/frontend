import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/manage-franchises">Manage Franchises</Link></li>
        <li><Link to="/admin/manage-users">Manage Users</Link></li>
        <li><Link to="/admin/global-menu-manager">Global Menu Manager</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
        <li><Link to="/admin/sales-overview">Sales Overview</Link></li>
      </ul>
    </div>
  );
}