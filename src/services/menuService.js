const API_BASE_URL = '/api/menu'; // Replace with your actual API endpoint

export async function getMenuItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    console.log('API Response:', response); // Debugging log
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const data = await response.json();
    console.log('Menu Items:', data); // Debugging log
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

export async function addMenuItem(item) {
  try {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to add menu item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding menu item:', error);
    return null;
  }
}

export async function removeMenuItem(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove menu item');
    }
    return true;
  } catch (error) {
    console.error('Error removing menu item:', error);
    return false;
  }
}