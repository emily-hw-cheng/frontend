import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'frostedcornerapi-bzf8ekb8d0d7hped.centralus-01.azurewebsites.net/api'; // Replace with your actual backend URL

// Add a new menu item
export const addMenuItem = async (menuItemData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/menu-items`, menuItemData);
      return response.data;
    } catch (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }
  };

// Delete menu item by ID
export const deleteMenuItemById = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/menu-items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  };

// Fetch all menu items
export const getAllMenuItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/menu-items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  };  

// Fetch orders for a specific customer
export const fetchCustomerOrders = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    throw error;
    }
};

// Fetch orders for a specific franchise
export const fetchFranchiseOrders = async (franchiseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/franchise/${franchiseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching franchise orders:', error);
    throw error;
  }
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get franchise details by franchise ID
export const getFranchiseById = async (franchiseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/franchise/${franchiseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching franchise details:', error);
      throw error;
    }
  }
  
// Add a new franchise
export const addFranchise = async (franchiseData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/franchise`, franchiseData);
      return response.data;
    } catch (error) {
      console.error('Error adding franchise:', error);
      throw error;
    }
  }
  
// Add an item to a franchise
export const addFranchiseItem = async (franchiseId, itemData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/franchise/${franchiseId}/items`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error adding item to franchise:', error);
      throw error;
    }
  }
  
// Remove an item from a franchise
export const removeFranchiseItem = async (franchiseId, itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/franchise/${franchiseId}/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing item from franchise:', error);
      throw error;
    }
}
    

// Get all orders
export const getAllOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  };
  
// Get order by ID
export const getOrderById = async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      throw error;
    }
  };
  
// Add franchise ID to an order
export const addFranchiseIdToOrder = async (orderId, franchiseId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/orders/${orderId}/franchise`, { franchiseId });
      return response.data;
    } catch (error) {
      console.error('Error adding franchise ID to order:', error);
      throw error;
    }
  };
  
  // Add customer ID to an order
export const addCustomerIdToOrder = async (orderId, customerId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/orders/${orderId}/customer`, { customerId });
      return response.data;
    } catch (error) {
      console.error('Error adding customer ID to order:', error);
      throw error;
    }
};
  
  // Add items to an order
  export const addOrderItems = async (orderId, items) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/orders/${orderId}/items`, { items });
      return response.data;
    } catch (error) {
      console.error('Error adding items to order:', error);
      throw error;
    }
};
  
  // Add delivery address to an order
  export const addDeliveryAddressToOrder = async (orderId, deliveryAddress) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/orders/${orderId}/delivery-address`, { deliveryAddress });
      return response.data;
    } catch (error) {
      console.error('Error adding delivery address to order:', error);
      throw error;
    }
};

// Add a menu item globally
export const addMenuItemToBackend = async (menuItemData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/menu-items`, menuItemData);
      return response.data;
    } catch (error) {
      console.error('Error adding menu item to backend:', error);
      throw error;
    }
};
  
  // Remove a menu item globally
  export const removeMenuItemFromBackend = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/menu-items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing menu item from backend:', error);
      throw error;
    }
};

// Fetch franchise orders by ID
export const getFranchiseOrdersById = async (franchiseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/franchise/${franchiseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching franchise orders:', error);
      throw error;
    }
  };