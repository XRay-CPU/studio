import React from 'react';
import Link from 'next/link';
import type { Quest } from '@/types';

interface NearestQuestListProps {
  quests: Quest[];
}

export function NearestQuestList({ quests }: NearestQuestListProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-5 rounded-xl shadow-lg bg-white dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 overflow-hidden">
      <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-3">Nearest Quests</h2>
      <ul className="space-y-4">
        {quests.map((q, i) => (
          <li key={q.id} className="p-4 rounded-lg bg-blue-50 dark:bg-zinc-800 border border-blue-100 dark:border-zinc-700 flex flex-col gap-2">
            <div className="text-base font-semibold text-foreground mb-1">{q.title}</div>
            <div className="text-xs text-muted-foreground mb-1">{q.description}</div>
            <div className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Location: {q.location}</div>
            <div className="flex justify-end">
              <Link href={`/dashboard/quests/${q.id}`}>
                <button className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-all text-sm">
                  Go to
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
