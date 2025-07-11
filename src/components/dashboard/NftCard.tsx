import Image from "next/image";
import type { Quest } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "../ui/badge";

type NftCardProps = {
  quest: Quest;
  date: string;
};

export function NftCard({ quest, date }: NftCardProps) {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={quest.image}
            alt={`NFT for ${quest.title}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={quest.dataAiHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-0 w-full p-3 flex flex-col items-start bg-transparent">
        <h3 className="font-bold text-sm text-white drop-shadow-md">{quest.title}</h3>
        <p className="text-xs text-slate-200 drop-shadow-md">Completed: {date}</p>
      </CardFooter>
    </Card>
  );
}
