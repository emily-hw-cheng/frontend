import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFranchiseById } from '../../services/api';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Get franchiseId from localStorage
  const franchiseId = localStorage.getItem('franchiseId');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        if (!franchiseId) {
          alert('Franchise ID not found. Please select a franchise.');
          navigate('/customer/select-franchise');
          return;
        }
        const franchise = await getFranchiseById(franchiseId);
        const items = Array.isArray(franchise.data.franchiseItems)
          ? franchise.data.franchiseItems.map(fi => ({
              id: fi.item.id,
              name: fi.item.name,
              description: fi.item.description,
              price: fi.customPrice ?? fi.item.price,
              image: fi.item.imageId ? `/images/${fi.item.imageId}` : '',
              dietaryRestrictions: fi.item.dietaryRestrictions,
            }))
          : [];
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        alert('Failed to fetch menu items. Please try again later.');
        setMenuItems([]);
      }
    };

    fetchMenuItems();
  }, [franchiseId, navigate]);

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    alert('Item added to cart!');
  };

  const handleProceedToOrder = () => {
    navigate('/customer/place-order', { state: { cart } });
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Menu</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(menuItems) && menuItems.length > 0 ? (
          menuItems.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow-lg">
              <img
                src={item.image || 'https://via.placeholder.com/150'}
                alt={item.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h4 className="font-bold text-lg">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-800 font-semibold">${item.price}</p>
              {item.dietaryRestrictions && (
                <p className="text-sm text-gray-500">Dietary: {item.dietaryRestrictions}</p>
              )}
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </li>
          ))
        ) : (
          <li>No menu items found.</li>
        )}
      </ul>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Cart</h3>
        <ul>
          {cart.map((cartItem, index) => (
            <li key={index} className="border-b py-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold">{cartItem.name}</h4>
                <p className="text-sm text-gray-600">Quantity: {cartItem.quantity}</p>
                <p className="text-sm text-gray-800 font-semibold">
                  Total: ${(cartItem.price * cartItem.quantity).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
            onClick={handleProceedToOrder}
          >
            Proceed to Takeout/Delivery
          </button>
        )}
      </div>
    </div>
  );
}