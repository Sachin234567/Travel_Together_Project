// ViewRoutes.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';

const ViewRoutes = () => {
  const [routes, setRoutes] = useState([
    { srcLat: 28.6448, srcLng: 77.216721, destLat: 28.7041, destLng: 77.1025 }
  ]);

  useEffect(() => {
    // Fetch routes data from an API or local state if applicable
  }, []);

  return (
    <div>
      <h2>View Routes</h2>
      <MapContainer center={[28.6448, 77.216721]} zoom={13} style={{ width: "100%", height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {routes.map((route, index) => (
          <React.Fragment key={index}>
            <Marker position={[route.srcLat, route.srcLng]}>
              <Popup>Start Point</Popup>
            </Marker>
            <Marker position={[route.destLat, route.destLng]}>
              <Popup>End Point</Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default ViewRoutes;
