import React, { useState } from 'react';
import { fetchFranchiseOrders } from '../../services/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Reports() {
  const [franchiseId, setFranchiseId] = useState('');
  const [franchiseOrders, setFranchiseOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchFranchiseReports = async () => {
    if (!franchiseId) {
      alert('Please enter a franchise ID.');
      return;
    }
    setLoading(true);
    try {
      const orders = await fetchFranchiseOrders(franchiseId);
      setFranchiseOrders(orders);
    } catch (error) {
      console.error('Error fetching franchise reports:', error);
      alert('Failed to fetch franchise reports.');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Franchise ID"
          value={franchiseId}
          onChange={(e) => setFranchiseId(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleFetchFranchiseReports}
        >
          Fetch Reports
        </button>
      </div>
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