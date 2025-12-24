'use server';

/**
 * @fileOverview An AI assistant that provides contextual information and guidance as users navigate the 3D portfolio.
 *
 * - getAssistantGuidance - A function that retrieves guidance from the AI assistant.
 * - AIAssistantInput - The input type for the getAssistantGuidance function.
 * - AIAssistantOutput - The return type for the getAssistantGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIAssistantInputSchema = z.object({
  pageName: z.string().describe('The name of the current page the user is on.'),
  hoveredElement: z.string().optional().describe('The name of the element the user is currently hovering over.'),
});
export type AIAssistantInput = z.infer<typeof AIAssistantInputSchema>;

const AIAssistantOutputSchema = z.object({
  guidanceText: z.string().describe('The contextual information and guidance from the AI assistant.'),
});
export type AIAssistantOutput = z.infer<typeof AIAssistantOutputSchema>;

export async function getAssistantGuidance(input: AIAssistantInput): Promise<AIAssistantOutput> {
  return aiAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAssistantPrompt',
  input: {schema: AIAssistantInputSchema},
  output: {schema: AIAssistantOutputSchema},
  prompt: `You are a helpful holographic AI assistant guiding users through Sumit Pathak's 3D portfolio.

You will provide contextual information and guidance based on the user's current page and hovered element.

Current page: {{{pageName}}}
Hovered element: {{{hoveredElement}}}

Provide concise and informative guidance to help the user understand Sumit's skills and projects.`,
});

const aiAssistantFlow = ai.defineFlow(
  {
    name: 'aiAssistantFlow',
    inputSchema: AIAssistantInputSchema,
    outputSchema: AIAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
