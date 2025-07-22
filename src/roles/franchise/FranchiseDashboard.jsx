import React from 'react';
import { Link } from 'react-router-dom';

export default function FranchiseDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/franchise/view-supplies">View Supplies</Link></li>
        <li><Link to="/franchise/place-order">Place Order</Link></li>
        <li><Link to="/franchise/view-menu-items">View Menu Items</Link></li>
      </ul>
    </div>
  );
}