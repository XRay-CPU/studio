"use client";
import dynamic from 'next/dynamic';

const GoogleMapEcoSpots = dynamic(
  () => import('../../../components/dashboard/GoogleMapEcoSpots'),
  { ssr: false }
);

export default function MapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Interactive Eco-Map</h1>
        <p className="text-muted-foreground">
          Discover eco spots across the Philippines.
        </p>
      </div>
      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMapEcoSpots />
      </div>
    </div>
  );
}
