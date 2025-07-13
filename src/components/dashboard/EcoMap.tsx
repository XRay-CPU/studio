
// import Image from "next/image";
import { MapPin } from "lucide-react";
import { questData } from "@/data/quests";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from 'next/link';
import React from 'react';

// Approximate coordinates for map pins on a placeholder image
const pinPositions = {
  'Alaminos, Pangasinan': { top: '35%', left: '40%' },
  'Bolinao, Pangasinan': { top: '25%', left: '25%' },
  'Dasol, Pangasinan': { top: '45%', left: '30%' },
  'San Fabian, Pangasinan': { top: '38%', left: '65%' },
  'Villasis, Pangasinan': { top: '60%', left: '75%' },
};


export function EcoMap() {
  const [selectedQuestId, setSelectedQuestId] = React.useState<string | null>(null);
  const selectedQuest = questData.find(q => q.id === selectedQuestId);

  return (
    <div className="relative w-full h-full flex rounded-lg overflow-hidden border shadow-lg">
      {/* Left panel for quest details */}
      <div className={`bg-white/90 dark:bg-zinc-900/90 border-r w-[350px] max-w-[90vw] p-6 overflow-y-auto transition-all duration-300 ${selectedQuest ? 'block' : 'hidden'} md:block`} style={{ minWidth: 300 }}>
        {selectedQuest ? (
          <div className="space-y-4">
            <Badge variant="secondary">{selectedQuest.category}</Badge>
            <h3 className="font-headline font-semibold text-xl">{selectedQuest.title}</h3>
            <p className="text-sm text-muted-foreground">{selectedQuest.location}</p>
            <svg
              width="320"
              height="180"
              viewBox="0 0 320 180"
              className="rounded-lg object-cover bg-gray-200 dark:bg-zinc-800"
              aria-label={selectedQuest.title}
            >
              <rect width="320" height="180" rx="12" fill="#e5e7eb" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="#888">
                {selectedQuest.title}
              </text>
              <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#aaa">
                {selectedQuest.location}
              </text>
            </svg>
            <p className="text-base">{selectedQuest.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-yellow-100 text-yellow-800 rounded px-2 py-1">Difficulty: {selectedQuest.difficulty}</span>
              <span className="text-xs bg-green-100 text-green-800 rounded px-2 py-1">Impact: {selectedQuest.impactRating}/5</span>
              <span className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">Tokens: {selectedQuest.tokens}</span>
            </div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {selectedQuest.todos.map((todo, idx) => <li key={idx}>{todo}</li>)}
            </ul>
            <Link
              href={`/dashboard/quests/${selectedQuest.id}`}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Go to Quest
            </Link>
            <Button variant="secondary" className="w-full" onClick={() => setSelectedQuestId(null)}>Close</Button>
          </div>
        ) : (
          <div className="text-center text-muted-foreground mt-20">Select a quest pin on the map to view details.</div>
        )}
      </div>

      {/* Map area */}
      <div className="relative flex-1">
        <svg
          viewBox="0 0 1200 800"
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Map of Pangasinan"
        >
          <rect width="1200" height="800" fill="#e5e7eb" />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="48" fill="#888">
            Pangasinan Map
          </text>
        </svg>
        <div className="absolute inset-0 bg-black/20" />

        {questData.map((quest) => {
          const position = pinPositions[quest.location as keyof typeof pinPositions] || { top: '50%', left: '50%' };
          return (
            <button
              key={quest.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none group"
              style={{ top: position.top, left: position.left }}
              onClick={() => setSelectedQuestId(quest.id)}
              aria-label={`Show details for ${quest.title}`}
            >
              <MapPin className={`h-8 w-8 text-accent drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] transition-colors ${selectedQuestId === quest.id ? 'text-yellow-400' : 'hover:text-yellow-400'}`} />
              {/* Hide quest name until hover */}
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 bg-white/90 dark:bg-zinc-900/90 rounded shadow text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                {quest.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
