'use client';

import { useAnalytics } from '@/hooks/use-analytics';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuestCard } from '@/components/dashboard/QuestCard';
import { questData } from '@/data/quests';
import { Coins, ShieldCheck, Spade } from 'lucide-react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function DashboardContent() {
  const { data } = useAnalytics();
  const recommendedQuests = questData.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, Bayani!</h1>
        <p className="text-muted-foreground">
          Ready to make a difference today? Here's your impact snapshot.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardStats />
        <StatCard
          title="Quests Completed"
          value={data.userStats.questsCompleted.toString()}
          icon={<ShieldCheck className="h-6 w-6 text-green-500" />}
          description="Total impact missions"
        />
        <StatCard
          title="Impact Level"
          value={data.userStats.impactLevel.toString()}
          icon={<Spade className="h-6 w-6 text-amber-600" />}
          description="Your eco-hero rank"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recommended Quests</CardTitle>
          </div>
          <Link href="/dashboard/quests">
            <Button variant="ghost">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
