// CreateRoute.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const CreateRoute = () => {
  const [route, setRoute] = useState({
    srcLat: null,
    srcLng: null,
    destLat: null,
    destLng: null
  });

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (!route.srcLat) {
          setRoute({ ...route, srcLat: lat, srcLng: lng });
        } else {
          setRoute({ ...route, destLat: lat, destLng: lng });
        }
      }
    });

    return route.srcLat && route.destLat ? (
      <>
        <Marker position={[route.srcLat, route.srcLng]}>
          <Popup>Start Point</Popup>
        </Marker>
        <Marker position={[route.destLat, route.destLng]}>
          <Popup>End Point</Popup>
        </Marker>
      </>
    ) : null;
  }

  return (
    <div>
      <h2>Create Route</h2>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: "100%", height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
      <div>
        <p>Source: {route.srcLat ? `${route.srcLat}, ${route.srcLng}` : "Not selected"}</p>
        <p>Destination: {route.destLat ? `${route.destLat}, ${route.destLng}` : "Not selected"}</p>
      </div>
    </div>
  );
};

export default CreateRoute;
