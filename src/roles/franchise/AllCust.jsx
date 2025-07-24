import React from 'react';

const orderHistory = [
  { id: 'ORD2001', total: 25.50, date: '2025-07-20', customer: { id: 1, name: 'Alice Smith', email: 'alice@gmail.com' } },
  { id: 'ORD2002', total: 18.75, date: '2025-07-21', customer: { id: 2, name: 'Bob Johnson', email: 'bob@gmail.com' } },
  { id: 'ORD2003', total: 32.00, date: '2025-07-22', customer: { id: 3, name: 'Carol Lee', email: 'carol@gmail.com' } },
  { id: 'ORD2004', total: 27.25, date: '2025-07-23', customer: { id: 4, name: 'David Kim', email: 'david@gmail.com' } },
  { id: 'ORD2005', total: 22.40, date: '2025-07-24', customer: { id: 5, name: 'Eva Brown', email: 'eva@gmail.com' } },
];

export default function AllCust() {
  return (
    <div className="center">
      <h2 className="text-3xl font-bold mb-6">Franchise Customers & Order History</h2>
      <div className="mb-8">
        <h3 className="text-2xl font mb-4">Order History</h3>
        <ul>
          {orderHistory.length === 0 ? (
            <li>No orders found.</li>
          ) : (
            orderHistory.map((order) => (
              <li key={order.id} className="border-b py-4">
                <div>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Total:</strong> ${order.total}</p>
                  <p><strong>Customer:</strong> {order.customer.name} ({order.customer.email})</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}