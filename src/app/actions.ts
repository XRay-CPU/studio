'use server';

import { recommendQuests } from '@/ai/flows/recommend-quests';
import { z } from 'zod';
import { questData } from '@/data/quests';
import type { Quest } from '@/types';

const recommendationSchema = z.object({
  interests: z.string().min(1, 'Interests are required.'),
  skillset: z.string().min(1, 'Skillset is required.'),
  travelPlans: z.string().min(1, 'Travel plans are required.'),
});

type RecommendationState = {
  message?: string | null;
  errors?: {
    interests?: string[];
    skillset?: string[];
    travelPlans?: string[];
  } | null;
  recommendedQuests?: Quest[] | null;
};

export async function getQuestRecommendations(prevState: RecommendationState, formData: FormData): Promise<RecommendationState> {
  const validatedFields = recommendationSchema.safeParse({
    interests: formData.get('interests'),
    skillset: formData.get('skillset'),
    travelPlans: formData.get('travelPlans'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      recommendedQuests: null,
    };
  }

  try {
    const availableQuests = JSON.stringify(questData.map(q => ({
      id: q.id,
      title: q.title,
      description: q.description,
      location: q.location,
      category: q.category
    })));

    const result = await recommendQuests({
      interests: validatedFields.data.interests,
      skillset: validatedFields.data.skillset,
      travelPlans: validatedFields.data.travelPlans,
      quests: availableQuests,
    });
    
    const recommendedQuestTitles = result.recommendedQuests
      .split('\n')
      .map(q => q.replace(/^- /, '').trim().toLowerCase())
      .filter(Boolean);

    const recommendedQuests = questData.filter(quest => 
      recommendedQuestTitles.some(title => quest.title.toLowerCase().includes(title))
    );

    if (recommendedQuests.length === 0) {
      return { message: 'No specific quests matched, but check these out!', recommendedQuests: questData.slice(0,3) };
    }

    return { message: 'Success', recommendedQuests: recommendedQuests, errors: null };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while getting recommendations.', errors: null, recommendedQuests: null };
  }
}
