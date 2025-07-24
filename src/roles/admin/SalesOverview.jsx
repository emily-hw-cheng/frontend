import React, { useState } from 'react';
import { fetchFranchiseOrders } from '../../services/api'; // Import API function
import { Bar } from 'react-chartjs-2'; // Import Bar chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesOverview() {
  const [franchiseId, setFranchiseId] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFetchSalesData = async () => {
    if (!franchiseId) {
      alert('Please enter a franchise ID.');
      return;
    }
    setLoading(true);
    try {
      const orders = await fetchFranchiseOrders(franchiseId); // Use the correct function
      setSalesData(orders);
  
      // Calculate total sales
      const sales = orders.reduce((sum, order) => sum + order.total, 0);
      setTotalSales(sales);
    } catch (error) {
      console.error('Error fetching sales data:', error);
      alert('Failed to fetch sales data.');
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: salesData.map(order => order.date), // Use order dates as labels
    datasets: [
      {
        label: 'Total Sales ($)',
        data: salesData.map(order => order.total), // Use order totals as data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Sales Overview</h2>
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
          onClick={handleFetchSalesData}
        >
          Fetch Sales Data
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3 className="text-2xl font-semibold mt-6">Summary</h3>
          <p><strong>Total Sales:</strong> ${totalSales.toFixed(2)}</p>

          <h3 className="text-2xl font-semibold mt-6">Sales Chart</h3>
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />

          <h3 className="text-2xl font-semibold mt-6">Order Details</h3>
          <ul>
            {salesData.map((order, index) => (
              <li key={index} className="border-b py-2">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Date:</strong> {order.date}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}