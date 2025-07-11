// GoogleMapEcoSpots.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Sample eco-tourism spots in Pangasinan (replace with real data as needed)
const spots = [
  { name: 'Hundred Islands National Park', lat: 16.1833, lng: 120.0086 },
  { name: 'Bolinao Falls', lat: 16.3842, lng: 119.8722 },
  { name: 'Enchanted Cave', lat: 16.3847, lng: 119.8892 },
  { name: 'Tondol White Sand Beach', lat: 16.4101, lng: 119.8922 },
  { name: 'Cabongaoan Beach', lat: 15.9917, lng: 119.7656 },
  { name: 'Tambobong Beach', lat: 15.9972, lng: 119.7706 },
  { name: 'Cape Bolinao Lighthouse', lat: 16.3972, lng: 119.7656 },
  { name: 'Lingayen Beach', lat: 16.0217, lng: 120.2311 },
  { name: 'Bani Mangrove Park', lat: 16.2022, lng: 119.8606 },
];

const mapStyle = {
  width: '100%',
  height: '600px',
};

const center = [16.1833, 120.0086];


export default function GoogleMapEcoSpots() {
  return (
    <MapContainer center={center} zoom={9} style={mapStyle} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot, idx) => (
        <Marker key={idx} position={[spot.lat, spot.lng]}>
          <Popup>{spot.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
