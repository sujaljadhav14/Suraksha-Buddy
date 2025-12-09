'use server';

/**
 * @fileOverview A flow to handle emergency requests from users using OpenAI.
 *
 * - handleEmergencyRequest - A function that processes user messages to identify emergencies.
 * - HandleEmergencyRequestInput - The input type for the handleEmergencyRequest function.
 * - HandleEmergencyRequestOutput - The return type for the handleEmergencyRequest function.
 */

import { openai, DEFAULT_MODEL } from '@/ai/openai-client';

export interface HandleEmergencyRequestInput {
  message: string;
}

export interface HandleEmergencyRequestOutput {
  isEmergency: boolean;
  response: string;
}

export async function handleEmergencyRequest(
  input: HandleEmergencyRequestInput
): Promise<HandleEmergencyRequestOutput> {
  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: `You are a safety assistant that analyzes user requests to determine if they are harmful, illegal, or indicate an emergency.

EMERGENCY SITUATIONS (set isEmergency=true):
- Physical danger (e.g., "someone is outside my house", "I am being followed")
- Medical emergencies (e.g., "I am having a heart attack", "I can't breathe")
- Immediate threats to safety

HARMFUL BUT NOT EMERGENCY (set isEmergency=false):
- Requests for illegal information (stalking, doxxing, weapons)
- Harmful content requests
Response: Politely refuse and suggest professional help

SAFE REQUESTS (set isEmergency=false):
- Normal digital wellness questions
Response: "not harmful"

Respond with JSON: {"isEmergency": boolean, "response": "your response"}`,
        },
        {
          role: 'user',
          content: input.message,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(responseText);
    return {
      isEmergency: parsed.isEmergency ?? false,
      response: parsed.response ?? 'not harmful',
    };
  } catch (error) {
    console.error('Error in emergency detection:', error);
    return {
      isEmergency: false,
      response: 'not harmful',
    };
  }
}
