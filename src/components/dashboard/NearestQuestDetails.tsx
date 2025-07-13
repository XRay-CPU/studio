import React from 'react';

interface NearestQuestProps {
  name: string;
  description: string;
  quest: string;
}

export function NearestQuestDetails({ name, description, quest }: NearestQuestProps) {
  return (
    <div className="w-full max-w-md mx-auto mt-6 p-5 rounded-xl shadow-lg bg-white dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 overflow-hidden">
      <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1">Nearest Quest</h2>
      <div className="mb-2 text-xl font-semibold text-foreground">{name}</div>
      <div className="mb-2 text-sm text-muted-foreground">{description}</div>
      <div className="text-base font-medium text-green-700 dark:text-green-400">Quest: {quest}</div>
    </div>
  );
}
