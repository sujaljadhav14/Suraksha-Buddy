'use server';

/**
 * @fileOverview Provides structured responses with explanations, solutions, polite messages, and mini-challenges using OpenAI.
 *
 * - provideSolutionsAndActions - A function that handles the process of generating structured responses.
 * - ProvideSolutionsAndActionsInput - The input type for the provideSolutionsAndActions function.
 * - ProvideSolutionsAndActionsOutput - The return type for the provideSolutionsAndActions function.
 */

import { openai, DEFAULT_MODEL } from '@/ai/openai-client';

export interface ProvideSolutionsAndActionsInput {
  category: string;
  userMessage: string;
}

export interface ProvideSolutionsAndActionsOutput {
  explanation: string;
  solutions: string[];
  politeMessage: string;
  miniChallenge: string;
}

export async function provideSolutionsAndActions(
  input: ProvideSolutionsAndActionsInput
): Promise<ProvideSolutionsAndActionsOutput> {
  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: `You are SurakshaBuddy, a friendly chatbot that helps users with digital wellness concerns.

Based on the category and user's message, provide a structured JSON response with:

1. explanation: Why the behavior is problematic (2-3 sentences)
2. solutions: Array of 2-4 practical, actionable solutions
3. politeMessage: A ready-to-copy message the user can send to others (if applicable)
4. miniChallenge: A small challenge to improve digital wellness

Be empathetic, practical, and encouraging. Format as JSON:
{
  "explanation": "...",
  "solutions": ["...", "..."],
  "politeMessage": "...",
  "miniChallenge": "..."
}`,
        },
        {
          role: 'user',
          content: `Category: ${input.category}\nUser Message: ${input.userMessage}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(responseText);

    return {
      explanation: parsed.explanation ?? 'This is a common digital wellness concern.',
      solutions: Array.isArray(parsed.solutions) ? parsed.solutions : ['Take regular breaks from screens', 'Set boundaries for digital usage'],
      politeMessage: parsed.politeMessage ?? 'I appreciate your understanding.',
      miniChallenge: parsed.miniChallenge ?? 'Try a 24-hour digital detox this weekend.',
    };
  } catch (error) {
    console.error('Error generating structured response:', error);

    // Fallback response
    return {
      explanation: 'This is a common digital wellness concern that many people face.',
      solutions: [
        'Set clear boundaries for your digital usage',
        'Communicate your needs to others politely',
        'Use app timers and digital wellness tools',
      ],
      politeMessage: 'I appreciate your understanding and support in maintaining healthy digital habits.',
      miniChallenge: 'Try implementing one of these solutions for the next 7 days.',
    };
  }
}
