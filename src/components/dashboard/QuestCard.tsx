import Image from 'next/image';
import type { Quest } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';

type QuestCardProps = {
  quest: Quest;
};

export function QuestCard({ quest }: QuestCardProps) {
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
        <Badge variant="secondary" className="mb-2">{quest.category}</Badge>
        <CardTitle className="text-lg font-headline mb-2">{quest.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{quest.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex flex-col items-start gap-4">
        <div className="flex justify-between w-full text-sm">
            <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{quest.tokens} Moral</span>
            </div>
            <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="font-semibold">{quest.difficulty}</span>
            </div>
        </div>
        <Button asChild className="w-full font-bold">
          <Link href={`/dashboard/quests/${quest.id}`}>View Quest</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
