import { UserAvatar } from "@/components/shared/UserAvatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Award, Leaf, Shield, Spade, Droplets, Trash2 } from "lucide-react";
import { NftCard } from "@/components/dashboard/NftCard";
import { questData } from "@/data/quests";

const badges = [
  { icon: Leaf, label: "First Tree Planted" },
  { icon: Droplets, label: "Mangrove Defender" },
  { icon: Trash2, label: "Cleanup Crew" },
  { icon: Award, label: "5 Quests Completed" },
  { icon: Shield, label: "Siargao Steward" },
];

export default function ProfilePage() {
    const completedQuests = questData.slice(0, 4);
    const userName = "Juan dela Cruz";
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <UserAvatar name={userName} className="h-20 w-20 border-4 border-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">{userName}</h1>
          <p className="text-accent font-semibold">Mangrove Defender</p>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Spade className="h-6 w-6" />
            Digital Bayani Kit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Quests Done</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">1,250</p>
                <p className="text-sm text-muted-foreground">Moral Tokens</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">250</p>
                <p className="text-sm text-muted-foreground">Trees Planted</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">50 kg</p>
                <p className="text-sm text-muted-foreground">Waste Removed</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Award className="h-6 w-6" />
            Badges & Affiliations
          </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {badges.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center text-center gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <badge.icon className="h-10 w-10 text-primary" />
                        <p className="text-xs font-medium">{badge.label}</p>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Proof-of-Action Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {completedQuests.map((quest) => (
              <NftCard key={quest.id} quest={quest} date="2024-05-10" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
