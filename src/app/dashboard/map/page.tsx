import dynamic from 'next/dynamic';
const GoogleMapEcoSpots = dynamic(() => import('../../../components/dashboard/GoogleMapEcoSpots'), { ssr: false });

export default function MapPage() {
  return (
    <div className="space-y-8 h-full">
      <div>
        <h1 className="text-3xl font-bold font-headline">Interactive Eco-Map</h1>
        <p className="text-muted-foreground">
          Discover quests across the Philippines. Click on a pin to learn more.
        </p>
      </div>
      <div className="h-[70vh] w-full">
        <GoogleMapEcoSpots />
      </div>
    </div>
  );
}
