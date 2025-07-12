"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Medal, Trophy, Target, Sparkles } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-yellow-500";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-amber-600";
    default:
      return "text-muted-foreground";
  }
};

const getLevelTitle = (level: number) => {
  if (level >= 10) return "Environmental Champion";
  if (level >= 7) return "Eco Warrior";
  if (level >= 5) return "Nature Guardian";
  if (level >= 3) return "Earth Protector";
  return "Eco Initiate";
};

export function LeaderboardCard() {
  const { users, isLoading, currentUserRank } = useLeaderboard();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bayani's Leaderboard</CardTitle>
          <Trophy className="h-6 w-6 text-yellow-500" />
        </div>
        <CardDescription>{currentMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <div className="space-y-4">
            {users.slice(0, 10).map((user, index) => (
              <motion.div
                key={user.address}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors
                  ${user.address === window.ethereum?.selectedAddress ? 'bg-primary/10' : 'hover:bg-accent/50'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${getRankColor(user.rank)}`}>
                    #{user.rank}
                  </span>
                  <UserAvatar name={user.name} className="h-10 w-10" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{user.name}</p>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        Lvl {user.level}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getLevelTitle(user.level)}
                    </p>
                    <div className="mt-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4" />
                        <span>{user.monthlyProgress.completed}/{user.monthlyProgress.total} Quests</span>
                      </div>
                      <Progress 
                        value={(user.monthlyProgress.completed / user.monthlyProgress.total) * 100}
                        className="h-1 mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {user.rank <= 3 && (
                    <Medal className={`h-5 w-5 ${getRankColor(user.rank)}`} />
                  )}
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.totalRewards} MORAL</p>
                    <p className="text-xs text-muted-foreground">Total Rewards</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
        
        {currentUserRank && currentUserRank > 10 && (
          <div className="mt-6 p-3 border-t">
            <p className="text-sm text-center text-muted-foreground">
              Your current rank: #{currentUserRank}
              <br />
              Complete more quests to climb the leaderboard!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
