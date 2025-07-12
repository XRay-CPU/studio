'use client';

import { useEffect } from 'react';

const spots = [
  { name: 'Hundred Islands National Park', lat: 16.1833, lng: 120.0086 },
  { name: 'Bolinao Falls', lat: 16.3842, lng: 119.8722 },
  { name: 'Enchanted Cave', lat: 16.3847, lng: 119.8892 }
];

export default function GoogleMapEcoSpots() {
  useEffect(() => {
    // Initialize the map only once after component mounts
    const L = require('leaflet');
    require('leaflet/dist/leaflet.css');

    // Only create map if it doesn't exist
    if (!document.querySelector('#map')) {
      // Create map container
      const mapDiv = document.createElement('div');
      mapDiv.id = 'map';
      mapDiv.style.height = '500px';
      mapDiv.style.width = '100%';
      document.getElementById('map-container')?.appendChild(mapDiv);

      // Initialize map
      const map = L.map('map').setView([16.1833, 120.0086], 9);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add markers
      spots.forEach(spot => {
        L.marker([spot.lat, spot.lng])
          .bindPopup(spot.name)
          .addTo(map);
      });
    }

    // Cleanup function
    return () => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        mapElement.remove();
      }
    };
  }, []); // Empty dependency array = run once on mount

  return <div id="map-container" />;
}
