'use server';
/**
 * @fileOverview An AI flow to generate an image for a quest.
 *
 * - generateQuestImage - A function that generates an image based on a quest's description.
 * - GenerateQuestImageInput - The input type for the generateQuestImage function.
 * - GenerateQuestImageOutput - The return type for the generateQuestImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';


const GenerateQuestImageInputSchema = z.object({
  title: z.string().describe('The title of the quest.'),
  description: z.string().describe('The description of the quest.'),
});
type GenerateQuestImageInput = z.infer<typeof GenerateQuestImageInputSchema>;

const GenerateQuestImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The data URI of the generated image. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
type GenerateQuestImageOutput = z.infer<typeof GenerateQuestImageOutputSchema>;

const generateQuestImageFlow = ai.defineFlow(
  {
    name: 'generateQuestImageFlow',
    inputSchema: GenerateQuestImageInputSchema,
    outputSchema: GenerateQuestImageOutputSchema,
  },
  async ({ title, description }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a photorealistic image representing the following environmental quest: "${title}". Description: ${description}. The image should be inspiring and show people actively participating in the activity.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);


export async function generateQuestImage(input: GenerateQuestImageInput): Promise<GenerateQuestImageOutput> {
  return generateQuestImageFlow(input);
}
