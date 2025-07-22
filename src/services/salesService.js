const API_BASE_URL = '/api/sales'; // Replace with your actual API endpoint

export async function getSalesData() {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
}