import Image from "next/image";
import { MapPin } from "lucide-react";
import { questData } from "@/data/quests";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from 'next/link';

// Approximate coordinates for map pins on a placeholder image
const pinPositions = {
  'Alaminos, Pangasinan': { top: '35%', left: '40%' },
  'Bolinao, Pangasinan': { top: '25%', left: '25%' },
  'Dasol, Pangasinan': { top: '45%', left: '30%' },
  'San Fabian, Pangasinan': { top: '38%', left: '65%' },
  'Villasis, Pangasinan': { top: '60%', left: '75%' },
};

export function EcoMap() {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border shadow-lg">
      <Image
        src="https://placehold.co/1200x800.png"
        alt="Map of Pangasinan"
        layout="fill"
        objectFit="cover"
        data-ai-hint="pangasinan map"
      />
      <div className="absolute inset-0 bg-black/20" />

      {questData.map((quest) => {
        const position = pinPositions[quest.location as keyof typeof pinPositions] || { top: '50%', left: '50%' };
        return (
          <Popover key={quest.id}>
            <PopoverTrigger asChild>
              <button
                className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={{ top: position.top, left: position.left }}
              >
                <MapPin className="h-8 w-8 text-accent drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] hover:text-yellow-400 transition-colors" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <Badge variant="secondary">{quest.category}</Badge>
                <h3 className="font-headline font-semibold">{quest.title}</h3>
                <p className="text-sm text-muted-foreground">{quest.location}</p>
                <p className="text-sm">{quest.description.substring(0, 100)}...</p>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/quests/${quest.id}`}>View Details</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
