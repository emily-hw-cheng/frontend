import React, { useState } from 'react';
import { useGlobalData } from '../../context/GlobalDataContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported

export default function FranchiseLeaderboard() {
  const { franchises, dessertOrders } = useGlobalData();
  const [selectedFranchise, setSelectedFranchise] = useState(null);

  const handleMarkerClick = (franchiseId) => {
    const dessertData = dessertOrders.find(order => order.franchiseId === franchiseId);
    setSelectedFranchise(dessertData);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={[37.7749, -122.4194]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {franchises.map(franchise => {
          // Validate lat and lng before rendering the marker
          if (typeof franchise.lat !== 'number' || typeof franchise.lng !== 'number') {
            console.error(`Invalid coordinates for franchise: ${franchise.name}`);
            return null;
          }
          return (
            <Marker
              key={franchise.id}
              position={[franchise.lat, franchise.lng]}
              eventHandlers={{
                click: () => handleMarkerClick(franchise.id),
              }}
            >
              <Popup>
                <div>
                  <h4>{franchise.name}</h4>
                  <p>Location: {franchise.location}</p>
                  {selectedFranchise && selectedFranchise.franchiseId === franchise.id && (
                    <p>Top Dessert: {selectedFranchise.dessert} </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}