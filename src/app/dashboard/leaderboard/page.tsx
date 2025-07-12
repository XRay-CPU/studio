import { LeaderboardCard } from "@/components/dashboard/LeaderboardCard";

export default function LeaderboardPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bayani's Leaderboard</h1>
          <p className="text-muted-foreground">
            Top 10 Bayanis making a difference this month. Complete more quests to climb the ranks!
          </p>
        </div>
        
        <LeaderboardCard />
      </div>
    </div>
  );
}
