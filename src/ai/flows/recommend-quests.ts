// src/ai/flows/recommend-quests.ts
'use server';
/**
 * @fileOverview A quest recommendation AI agent.
 *
 * - recommendQuests - A function that recommends quests based on user interests, skillset, and travel plans.
 * - RecommendQuestsInput - The input type for the recommendQuests function.
 * - RecommendQuestsOutput - The return type for the recommendQuests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendQuestsInputSchema = z.object({
  interests: z
    .string()
    .describe('The user interests, e.g. marine protection, reforestation, urban greening.'),
  skillset: z.string().describe('The user skillset, e.g. planting, cleaning, teaching, surveying.'),
  travelPlans: z.string().describe('The user travel plans, e.g. Siargao in July.'),
  quests: z.string().describe('A list of available quests.'),
});
export type RecommendQuestsInput = z.infer<typeof RecommendQuestsInputSchema>;

const RecommendQuestsOutputSchema = z.object({
  recommendedQuests: z
    .string()
    .describe('A list of recommended quests based on the user interests, skillset, and travel plans.'),
});
export type RecommendQuestsOutput = z.infer<typeof RecommendQuestsOutputSchema>;

export async function recommendQuests(input: RecommendQuestsInput): Promise<RecommendQuestsOutput> {
  return recommendQuestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendQuestsPrompt',
  input: {schema: RecommendQuestsInputSchema},
  output: {schema: RecommendQuestsOutputSchema},
  prompt: `You are an AI assistant designed to recommend quests to users based on their interests, skillset, and travel plans.

  Given the following user information and a list of available quests, recommend the most relevant quests to the user.

  User Interests: {{{interests}}}
  User Skillset: {{{skillset}}}
  User Travel Plans: {{{travelPlans}}}
  Available Quests: {{{quests}}}

  Recommended Quests:`, // Ensure the prompt ends with the desired output.
});

const recommendQuestsFlow = ai.defineFlow(
  {
    name: 'recommendQuestsFlow',
    inputSchema: RecommendQuestsInputSchema,
    outputSchema: RecommendQuestsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
