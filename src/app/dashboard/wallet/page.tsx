import { TokenSwap } from "@/components/dashboard/TokenSwap";
import { QuestCard } from "@/components/dashboard/QuestCard";
import { questData } from "@/data/quests";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";

export default function WalletPage() {
  const highRewardQuests = questData
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Wallet</h1>
        <p className="text-muted-foreground">
          Manage your Moral tokens and convert other cryptocurrencies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TokenSwap />
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Coins className="h-6 w-6 text-yellow-500" />
                Earn More Moral
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Complete these high-reward quests to boost your balance.</p>
              {highRewardQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
