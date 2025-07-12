'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { getQuestRecommendations } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { QuestCard } from './QuestCard';
import type { Quest } from '@/types';

type RecommendationState = {
  message?: string | null;
  errors?: {
    interests?: string[];
    skillset?: string[];
    travelPlans?: string[];
  } | null;
  recommendedQuests?: Quest[] | null;
};

const initialState: RecommendationState = {
  message: null,
  errors: null,
  recommendedQuests: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Matching...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Find My Quests
        </>
      )}
    </Button>
  );
}

export function QuestRecommendation() {
  const [state, formAction] = useActionState(getQuestRecommendations, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        title: 'Recommendation Info',
        description: state.message,
        variant: state.errors ? 'destructive' : 'default',
      });
    }
  }, [state, toast]);

  return (
    <Card className="bg-card/80">
      <CardHeader>
        <CardTitle className="font-headline text-xl">AI-Powered Quest Matching</CardTitle>
        <CardDescription>Tell us about yourself and we'll find the perfect mission for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interests">Your Interests</Label>
              <Input id="interests" name="interests" placeholder="e.g., marine protection, reforestation" />
              {state.errors?.interests && <p className="text-sm text-destructive">{state.errors.interests[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="skillset">Your Skillset</Label>
              <Input id="skillset" name="skillset" placeholder="e.g., planting, diving, teaching" />
              {state.errors?.skillset && <p className="text-sm text-destructive">{state.errors.skillset[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="travelPlans">Travel Plans</Label>
            <Textarea id="travelPlans" name="travelPlans" placeholder="e.g., Visiting Siargao in July for 2 weeks" />
            {state.errors?.travelPlans && <p className="text-sm text-destructive">{state.errors.travelPlans[0]}</p>}
          </div>
          <SubmitButton />
        </form>

        {state.recommendedQuests && state.recommendedQuests.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold font-headline mb-4">Your Recommended Quests</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {state.recommendedQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
