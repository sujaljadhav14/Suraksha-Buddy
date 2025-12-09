'use server';

import { categorizeUserMessage } from '@/ai/flows/categorize-user-message';
import { provideSolutionsAndActions } from '@/ai/flows/provide-structured-responses';
import { handleEmergencyRequest } from '@/ai/flows/handle-emergency-requests';
import { checkRateLimit } from '@/lib/rate-limiter';
import { getCachedResponse, setCachedResponse } from '@/lib/response-cache';
import type { Message } from '@/lib/types';

export async function getAIResponse(
  chatHistory: Message[],
  sessionId: string
): Promise<Omit<Message, 'id'>> {
  const userMessage = chatHistory[chatHistory.length - 1].content;

  // Check cache first (before rate limit to save quota)
  const cachedResponse = getCachedResponse(userMessage);
  if (cachedResponse) {
    console.log('🚀 Returning cached response (no API call)');
    return cachedResponse;
  }

  // Check rate limit
  const rateLimit = checkRateLimit(sessionId);

  if (!rateLimit.allowed) {
    const resetTime = new Date(rateLimit.resetAt!).toLocaleTimeString();
    return {
      role: 'system',
      content: `⚠️ You've reached the maximum of 18 requests. Your limit will reset at ${resetTime}. Please try again later.`,
    };
  }

  // 1. Safety and emergency check
  try {
    const safetyCheck = await handleEmergencyRequest({ message: userMessage });

    if (safetyCheck.isEmergency) {
      const response = {
        role: 'assistant' as const,
        content: safetyCheck.response,
        isEmergency: true,
      };
      // Don't cache emergency responses
      return response;
    }

    if (safetyCheck.response !== 'not harmful') {
      return {
        role: 'system',
        content: safetyCheck.response,
      };
    }

    // 2. Categorize message
    const { category } = await categorizeUserMessage({ message: userMessage });

    if (category === 'Gratitude') {
      const response = {
        role: 'assistant' as const,
        content: "You're most welcome! I'm glad I could help. Is there anything else you need assistance with?",
      };
      setCachedResponse(userMessage, response);
      return response;
    }

    if (category === 'None' || !category) {
      const response = {
        role: 'assistant' as const,
        content: "I'm sorry, I'm not quite sure how to help with that. My expertise is in digital wellness. Could you please rephrase your concern, or perhaps ask about something like screen addiction, online safety, or social media ethics?",
      };
      setCachedResponse(userMessage, response);
      return response;
    }

    // 3. Provide structured response
    const structuredResponse = await provideSolutionsAndActions({
      category,
      userMessage,
    });

    const response = {
      role: 'assistant' as const,
      content: `Here's some information about ${category.toLowerCase()}:`,
      structuredContent: structuredResponse,
    };

    // Cache the successful response
    setCachedResponse(userMessage, response);
    return response;
  } catch (error) {
    console.error("AI Action Error:", error);
    return {
      role: 'system',
      content: 'An error occurred while processing your request. Please try again.'
    }
  }
}

export async function getRateLimitInfo(sessionId: string) {
  const rateLimit = checkRateLimit(sessionId);
  return {
    remaining: rateLimit.remaining,
    resetAt: rateLimit.resetAt,
  };
}
