export async function getFranchises() {
    try {
      const response = await fetch('/api/franchises'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch franchises');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching franchises:', error);
      return [];
    }
  }
  
  export async function addFranchise(franchise) {
    try {
      const response = await fetch('/api/franchises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(franchise),
      });
      if (!response.ok) {
        throw new Error('Failed to add franchise');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding franchise:', error);
      return null;
    }
  }

  export async function removeFranchise(id) {
    try {
      const response = await fetch(`/api/franchises/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove franchise');
      }
      return true;
    } catch (error) {
      console.error('Error removing franchise:', error);
      return false;
    }
  }