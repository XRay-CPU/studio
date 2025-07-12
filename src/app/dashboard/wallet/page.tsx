
"use client";

import * as React from "react";
import { TokenSwap } from "@/components/dashboard/TokenSwap";
import { QuestCard } from "@/components/dashboard/QuestCard";
import { questData } from "@/data/quests";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function WalletPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  const highRewardQuests = questData
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, 3);
  
  const firstQuest = highRewardQuests[0];
  const remainingQuests = highRewardQuests.slice(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Wallet</h1>
        <p className="text-muted-foreground">
          Manage your Moral tokens and convert other cryptocurrencies.
        </p>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Coins className="h-6 w-6 text-yellow-500" />
              Earn More Moral
            </CardTitle>
            <p className="text-sm text-muted-foreground pt-2">
              Complete these high-reward quests to boost your balance.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {firstQuest && <QuestCard quest={firstQuest} />}
            
            <CollapsibleContent className="space-y-4 animate-in fade-in-0">
              {remainingQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </CollapsibleContent>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full">
                <ChevronDown className={cn("h-4 w-4 mr-2 transition-transform", isOpen && "rotate-180")} />
                {isOpen ? "Show Less" : "Show More"}
              </Button>
            </CollapsibleTrigger>
          </CardContent>
        </Card>
      </Collapsible>

      <TokenSwap />
    </div>
  );
}
