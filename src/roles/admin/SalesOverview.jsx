import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Hardcoded sales summary data for chart
const productSales = [
  { product: 'Chocolate Chip Cookie', sales: 120 },
  { product: 'Vanilla Cake', sales: 85 },
  { product: 'Fruit Tart', sales: 60 },
  { product: 'Tiramisu', sales: 45 },
  { product: 'Mango Smoothie', sales: 100 },
];

// Hardcoded order list data
const orderList = [
  { id: 'ORD2001', total: 25.50, date: '2025-07-20' },
  { id: 'ORD2002', total: 18.75, date: '2025-07-21' },
  { id: 'ORD2003', total: 32.00, date: '2025-07-22' },
  { id: 'ORD2004', total: 27.25, date: '2025-07-23' },
  { id: 'ORD2005', total: 22.40, date: '2025-07-24' },
];

// Chart data
const chartData = {
  labels: productSales.map(item => item.product),
  datasets: [
    {
      label: 'Units Sold',
      data: productSales.map(item => item.sales),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

// Calculate total sales
const totalSales = orderList.reduce((sum, order) => sum + order.total, 0);

export default function SalesOverview() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Sales Overview</h2>
      <h3 className="text-2xl font-semibold mt-6">Summary</h3>
      <p><strong>Total Sales:</strong> ${totalSales.toFixed(2)}</p>

      <h3 className="text-2xl font-semibold mt-6">Sales Chart</h3>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />

      <h3 className="text-2xl font-semibold mt-6">Recent Orders</h3>
      <ul>
        {orderList.map((order, index) => (
          <li key={index} className="border-b py-2">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Date:</strong> {order.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}