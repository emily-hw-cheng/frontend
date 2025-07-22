const API_BASE_URL = '/api/users'; // Replace with your actual API endpoint

export async function getUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function addUser(user) {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
}

export async function removeUser(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove user');
    }
    return true;
  } catch (error) {
    console.error('Error removing user:', error);
    return false;
  }
}