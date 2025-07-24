import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'https://frostedcornerapi-bzf8ekb8d0d7hped.centralus-01.azurewebsites.net/api';

// Order Endpoints
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Order`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Order`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order. Please try again.');
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

export const fetchCustomerOrder = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Order/customer/${customerId}`);
    // Always return a single order object
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching customer order:', error);
    throw error;
  }
};

export const fetchFranchiseOrders = async (franchiseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Order/franchise/${franchiseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching franchise orders:', error);
    throw error;
  }
};

// Supplies Endpoints
export const getAllSupplies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Supplies`);
    return response.data.data; // Correct: returns the array
  } catch (error) {
    console.error('Error fetching supplies:', error);
    throw error;
  }
};

export const createSupply = async (supplyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Supplies`, supplyData);
    return response.data;
  } catch (error) {
    console.error('Error creating supply:', error);
    throw error;
  }
};

// Franchise Endpoints
export const getAllFranchises = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Franchise`);
    return response.data.data; // <-- Only the array!
  } catch (error) {
    console.error('Error fetching franchises:', error);
    throw error;
  }
};

export const addFranchise = async (franchiseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Franchise/addFranchise`, franchiseData);
    return response.data;
  } catch (error) {
    console.error('Error adding franchise:', error);
    throw error;
  }
};


export const addFranchiseItem = async (franchiseId, itemId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Franchise/addItem/${franchiseId}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding franchise item:', error);
    throw error;
  }
};

export const addItemToAllFranchises = async (itemId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Franchise/addToAllFranchises/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding item to all franchises:', error);
    throw error;
  }
};
/*
export const editFranchiseItem = async (editData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Franchise/editItem`, {
      FranchiseId: editData.FranchiseId,
      ItemId: editData.ItemId,
      CustomColor: editData.CustomColor,
      CustomPrice: editData.CustomPrice
    });
    return response.data;
  } catch (error) {
    console.error('Error editing franchise item:', error);
    throw error;
  }
};*/

export async function editFranchiseItem(payload) {
  return axios.post(
    'https://frostedcornerapi-bzf8ekb8d0d7hped.centralus-01.azurewebsites.net/api/Franchise/editItem',
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );
}

export const getFranchiseById = async (franchiseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Franchise/${franchiseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching franchise details:', error);
    throw error;
  }
};

// Item Endpoints
export const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Item`);
    return response.data.data; // <-- Fix: use .data.data
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const addItem = async (itemData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Item`, itemData);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const getItemById = async (itemId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Item/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    throw error;
  }
};

export const deleteItemById = async (itemId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Item/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item by ID:', error);
    throw error;
  }
};

export const getItemsByType = async (type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Item/type/${type}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items by type:', error);
    throw error;
  }
};

// Delete a franchise-specific menu item by ID
export const deleteFranchiseItemById = async (itemId) => {
  try {
    await axios.delete(`${API_BASE_URL}/Item/${itemId}`);
  } catch (error) {
    console.error('Error deleting franchise item:', error);
    throw error;
  }
};

export const fetchCustomerOrders = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Order/customer/${customerId}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    throw error;
  }
};