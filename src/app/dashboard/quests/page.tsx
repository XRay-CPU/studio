import { Separator } from "@/components/ui/separator";
import { questData } from "@/data/quests";
import dynamic from 'next/dynamic';

const QuestCard = dynamic(() => import('@/components/dashboard/QuestCard').then(mod => mod.QuestCard));
const QuestRecommendation = dynamic(() => import('@/components/dashboard/QuestRecommendation').then(mod => mod.QuestRecommendation));


export default function QuestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Find Your Mission</h1>
        <p className="text-muted-foreground">
          Use our AI assistant to match with the perfect quest, or browse all available missions.
        </p>
      </div>
      
      <QuestRecommendation />

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">All Available Quests</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {questData.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </div>
  );
}
