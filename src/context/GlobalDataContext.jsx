// filepath: [GlobalDataContext.jsx](http://_vscodecontentref_/8)
import React, { createContext, useState, useContext } from 'react';

const GlobalDataContext = createContext();

export function GlobalDataProvider({ children }) {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Chocolate Chip Cookie', price: 3.99, image: '/images/cc_cookie.png', description: 'A classic cookie with chocolate chips.', dietaryRestrictions: 'Contains gluten, dairy' },
    { id: 2, name: 'Vanilla Cake', price: 5.99, image: '/images/vanilla_cake.png', description: 'A moist vanilla-flavored cake.', dietaryRestrictions: 'Contains gluten, dairy, eggs' },
    { id: 3, name: 'Glazed Donut', price: 1.99, image: '/images/donut.png', description: 'A soft donut with a sugary glaze.', dietaryRestrictions: 'Contains gluten, dairy' },
    { id: 4, name: 'Blueberry Muffin', price: 3.49, image: '/images/BlueberryMuffin.png', description: 'A muffin filled with fresh blueberries.', dietaryRestrictions: 'Contains gluten, dairy, eggs' },
    { id: 5, name: 'Vanilla Ice Cream', price: 4.99, image: '/images/vanillaIcecream.png', description: 'Creamy vanilla-flavored ice cream.', dietaryRestrictions: 'Contains dairy' },
    { id: 6, name: 'Strawberry Cupcake', price: 3.99, image: '/images/StrawberryCupcake.png', description: 'A cupcake topped with strawberry frosting.', dietaryRestrictions: 'Contains gluten, dairy, eggs' },
    { id: 7, name: 'Peach Milkshake', price: 5.99, image: '/images/peachMilkshake.png', description: 'A refreshing milkshake made with peaches.', dietaryRestrictions: 'Contains dairy' },
    { id: 8, name: 'Fruit Tart', price: 6.99, image: '/images/fruit_tart.png', description: 'A tart filled with fresh fruits.', dietaryRestrictions: 'Contains gluten, dairy, eggs' },
    { id: 9, name: 'Mango Smoothie', price: 4.99, image: '/images/mangoSmoothie.png', description: 'A tropical smoothie made with mangoes.', dietaryRestrictions: 'Vegan' },
    { id: 10, name: 'Tiramisu', price: 7.99, image: '/images/tiramisu.png', description: 'A classic Italian dessert with coffee flavor.', dietaryRestrictions: 'Contains gluten, dairy, eggs' },
  ]);

  const [supplies, setSupplies] = useState([
    { id: 1, name: 'Paper Bowls', quantity: 100 },
    { id: 2, name: 'Paper Cups', quantity: 200 },
    { id: 3, name: 'Scoopers', quantity: 50 },
    { id: 4, name: 'Lids', quantity: 150 },
    { id: 5, name: 'Plates', quantity: 100 },
    { id: 6, name: 'Spoons', quantity: 300 },
    { id: 7, name: 'Tissues', quantity: 500 },
    { id: 8, name: 'Boxes', quantity: 75 },
    { id: 9, name: 'Plastic Bags', quantity: 200 },
    { id: 10, name: 'Gloves', quantity: 100 },
    { id: 11, name: 'Aprons', quantity: 50 },
    { id: 12, name: 'Hairnets', quantity: 30 },
  ]);

  const addMenuItem = (newItem) => {
    setMenuItems([...menuItems, { ...newItem, id: menuItems.length + 1 }]);
  };

  const removeMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const addSupply = (newSupply) => {
    setSupplies([...supplies, { ...newSupply, id: supplies.length + 1 }]);
  };

  const removeSupply = (id) => {
    setSupplies(supplies.filter(supply => supply.id !== id));
  };

  return (
    <GlobalDataContext.Provider value={{ menuItems, supplies, addMenuItem, removeMenuItem, addSupply, removeSupply }}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export function useGlobalData() {
  return useContext(GlobalDataContext);
}