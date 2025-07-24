import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const sampleOrders = [
  { id: 'ORD1001', date: '2025-07-01' },
  { id: 'ORD1002', date: '2025-07-01' },
  { id: 'ORD1003', date: '2025-07-02' },
  { id: 'ORD1004', date: '2025-07-03' },
  { id: 'ORD1005', date: '2025-07-03' },
  { id: 'ORD1006', date: '2025-07-04' },
  { id: 'ORD1007', date: '2025-07-04' },
  { id: 'ORD1008', date: '2025-07-05' },
];

export default function Reports() {
  const [franchiseOrders, setFranchiseOrders] = useState(sampleOrders);
  const [loading] = useState(false);

  // Prepare data for the line chart (showing order count per date)
  const orderCountByDate = franchiseOrders.reduce((acc, order) => {
    acc[order.date] = (acc[order.date] || 0) + 1;
    return acc;
  }, {});
  const chartData = {
    labels: Object.keys(orderCountByDate),
    datasets: [
      {
        label: 'Total Orders',
        data: Object.values(orderCountByDate),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Franchise Reports</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mt-6">Summary</h3>
          <p><strong>Total Orders:</strong> {franchiseOrders.length}</p>

          <h3 className="text-2xl font-semibold mt-6">Orders Trend</h3>
          <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />

          <ul>
            {franchiseOrders.map((order, index) => (
              <li key={index} className="border-b py-2">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {order.date}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}