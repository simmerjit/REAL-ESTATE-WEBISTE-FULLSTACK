import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = ({ location }) => {

const MapUpdater = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location?.lat && location?.lng) {
      map.setView([location.lat, location.lng], 13); // zoom level 13
    }
  }, [location, map]);

  return null;
};

  return (
    <div>
      {location?.lat && location?.lng ? (
  <MapContainer
    center={[location.lat, location.lng]}
    zoom={13}
    scrollWheelZoom={true}
    style={{ height: "100vh", width: "100%" }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[location.lat, location.lng]}>
      <Popup>
        You searched here: <br />
        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
      </Popup>
    </Marker>
    <MapUpdater location={location} />
  </MapContainer>
) : (
  <p>Loading map...</p>
)}

      
    </div>
  )
}

export default MapComponent
