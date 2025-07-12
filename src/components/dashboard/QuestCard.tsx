"use client";

import Image from 'next/image';
import type { Quest } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, MapPin, Zap, Loader2, Trophy, Flame } from 'lucide-react';
import Link from 'next/link';
import { useRewards } from '@/hooks/useRewards';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

type QuestCardProps = {
  quest: Quest;
};

export function QuestCard({ quest }: QuestCardProps) {
  const { claimReward, isProcessing } = useRewards();
  const { toast } = useToast();
  const [claimed, setClaimed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [questProgress, setQuestProgress] = useState(0);

  useEffect(() => {
    // Load streak and progress from localStorage
    const userId = window.ethereum?.selectedAddress;
    if (userId) {
      const storedStreak = localStorage.getItem(`streak_${userId}`);
      if (storedStreak) {
        setStreak(parseInt(storedStreak));
      }

      const storedProgress = localStorage.getItem(`progress_${userId}_${quest.id}`);
      if (storedProgress) {
        setQuestProgress(parseInt(storedProgress));
      }
    }
  }, [quest.id]);

  const handleClaim = async () => {
    if (!window.ethereum?.selectedAddress) {
      // Show connect wallet message
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to claim rewards.",
        variant: "destructive"
      });
      return;
    }

    try {
      const txHash = await claimReward({
        questId: quest.id,
        amount: quest.tokens.toString(),
        recipient: window.ethereum.selectedAddress,
        timestamp: Date.now()
      });
      
      setClaimed(true);
      
      // Update streak and progress
      const userId = window.ethereum.selectedAddress;
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem(`streak_${userId}`, newStreak.toString());

      const newProgress = Math.min(questProgress + 25, 100);
      setQuestProgress(newProgress);
      localStorage.setItem(`progress_${userId}_${quest.id}`, newProgress.toString());

      // Show success message with transaction hash
      toast({
        title: "Reward Claimed!",
        description: (
          <div className="mt-2 text-xs">
            <p>Transaction Hash:</p>
            <code className="block mt-1 p-2 bg-secondary rounded">
              {txHash}
            </code>
          </div>
        )
      });
    } catch (error: any) {
      console.error('Error claiming reward:', error);
      
      // Show user-friendly error message
      toast({
        title: "Failed to Claim Reward",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={quest.image}
            alt={quest.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={quest.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{quest.category}</Badge>
          <div className="flex gap-2">
            {streak > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      {streak}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Streak! Keep it up!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {questProgress >= 100 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-yellow-500" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Quest Mastered!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <CardTitle className="text-lg font-headline mb-2">{quest.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{quest.location}</span>
        </div>
        {questProgress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{questProgress}%</span>
            </div>
            <Progress value={questProgress} className="h-1" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex flex-col items-start gap-4">
        <div className="flex justify-between w-full text-sm">
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold">{quest.tokens} MORAL</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-orange-500" />
            <span className="font-semibold">{quest.difficulty}</span>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Button 
            asChild 
            variant="outline" 
            className="flex-1"
          >
            <Link href={`/dashboard/quests/${quest.id}`}>View Details</Link>
          </Button>
          <Button
            onClick={handleClaim}
            disabled={isProcessing || claimed}
            className="flex-1 font-bold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : claimed ? (
              'Claimed'
            ) : (
              'Claim Rewards'
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
