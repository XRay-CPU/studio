import { questData } from "@/data/quests";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Coins,
  MapPin,
  Zap,
  Users,
  Star,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function QuestDetailPage({ params }: { params: { id: string } }) {
  const quest = questData.find((q) => q.id === params.id);

  if (!quest) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/dashboard/quests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Quests
          </Link>
        </Button>
        <h1 className="text-4xl font-bold font-headline">{quest.title}</h1>
        <p className="text-muted-foreground text-lg flex items-center gap-2 mt-2">
          <MapPin className="h-5 w-5" />
          {quest.location}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="overflow-hidden">
            <div className="relative h-96 w-full">
              <Image
                src={quest.image}
                alt={quest.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={quest.dataAiHint}
              />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Quest Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{quest.description}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Mission Briefing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Zap className="h-5 w-5" /> Difficulty</span>
                <Badge variant={quest.difficulty === 'Easy' ? 'secondary' : quest.difficulty === 'Medium' ? 'default' : 'destructive'} className="text-sm">{quest.difficulty}</Badge>
              </div>

               <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Star className="h-5 w-5" /> Impact</span>
                <span className="font-semibold">{quest.impactRating} / 5</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Users className="h-5 w-5" /> Partner</span>
                <span className="font-semibold">{quest.partner}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-5 w-5" /> Category</span>
                <Badge variant="outline">{quest.category}</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 items-start pt-6">
                 <Separator />
                <div className="flex items-center justify-between w-full">
                    <span className="text-muted-foreground">Rewards</span>
                    <div className="flex items-center gap-2">
                        <Coins className="h-6 w-6 text-yellow-500" />
                        <span className="text-xl font-bold">{quest.tokens} $CARE</span>
                    </div>
                </div>
              <Button size="lg" className="w-full font-bold">Accept Quest</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
