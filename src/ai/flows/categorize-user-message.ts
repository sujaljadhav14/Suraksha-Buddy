'use server';

/**
 * @fileOverview Categorizes user messages into predefined topics using OpenAI.
 *
 * - categorizeUserMessage - A function that categorizes user messages.
 * - CategorizeUserMessageInput - The input type for the categorizeUserMessage function.
 * - CategorizeUserMessageOutput - The return type for the categorizeUserMessage function.
 */

import { openai, DEFAULT_MODEL } from '@/ai/openai-client';

const VALID_CATEGORIES = [
  'WhatsApp forwards',
  'Screen addiction',
  'Loud public videos',
  'Reel ethics',
  'Leaving on \'seen\'',
  'General digital wellness',
  'Gratitude',
  'None',
] as const;

export type Category = typeof VALID_CATEGORIES[number];

export interface CategorizeUserMessageInput {
  message: string;
}

export interface CategorizeUserMessageOutput {
  category: Category;
}

export async function categorizeUserMessage(
  input: CategorizeUserMessageInput
): Promise<CategorizeUserMessageOutput> {
  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: `You are a message categorization assistant. Categorize the user's message into EXACTLY ONE of these categories:

- WhatsApp forwards
- Screen addiction
- Loud public videos
- Reel ethics
- Leaving on 'seen'
- General digital wellness
- Gratitude
- None

Rules:
- If the user is expressing thanks (e.g., "thank you", "thanks", "that was helpful"), use 'Gratitude'.
- If the concern doesn't fit a specific category but is related to digital life, use 'General digital wellness'.
- If completely unrelated to digital wellness, use 'None'.

Respond with ONLY a JSON object: {"category": "Category Name"}`,
        },
        {
          role: 'user',
          content: input.message,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(responseText);
    const category = parsed.category;

    // Validate category
    if (!VALID_CATEGORIES.includes(category)) {
      console.warn(`Invalid category received: ${category}, defaulting to 'None'`);
      return { category: 'None' };
    }

    return { category };
  } catch (error) {
    console.error('Error categorizing message:', error);
    return { category: 'General digital wellness' };
  }
}
