'use client';

import { useState, useEffect } from 'react';
import { getAIResponse } from './actions';
import { getRemainingRequests } from '@/lib/rate-limiter';
import type { Message } from '@/lib/types';
import { ChatLayout } from '@/components/chat/chat-layout';

const initialMessages: Message[] = [
  {
    id: 'init',
    role: 'assistant',
    content: "Hello! I'm SurakshaBuddy. I can help you with digital wellness concerns. How can I assist you today?",
  },
  {
    id: 'init-prompts',
    role: 'example_prompts',
    content: '',
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [remainingRequests, setRemainingRequests] = useState(18);

  useEffect(() => {
    // Generate session ID once on mount
    const id = crypto.randomUUID();
    setSessionId(id);
  }, []);

  const updateRemainingRequests = () => {
    if (sessionId) {
      const remaining = getRemainingRequests(sessionId);
      setRemainingRequests(remaining);
    }
  };

  const handleSendMessage = async (userInput: string) => {
    if (isLoading || !userInput.trim() || !sessionId) return;

    setIsLoading(true);
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: userInput };
    // Remove initial prompts if they exist
    const currentMessages = messages.filter(m => m.role !== 'example_prompts');
    setMessages([...currentMessages, userMessage]);

    try {
      const aiResponse = await getAIResponse([...currentMessages, userMessage], sessionId);

      const responseId = crypto.randomUUID();
      const promptsId = crypto.randomUUID();

      const newMessages: Message[] = [
        { ...aiResponse, id: responseId }
      ];

      // Don't show prompts after emergency or system messages
      if (!aiResponse.isEmergency && aiResponse.role === 'assistant') {
        newMessages.push({ id: promptsId, role: 'example_prompts', content: '' });
      }

      setMessages(prev => [...prev, ...newMessages]);

      // Update remaining requests after response
      updateRemainingRequests();
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'system',
        content: 'An error occurred. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative">
      <ChatLayout
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />

      {/* Rate Limit Indicator */}
      <div className="fixed bottom-20 right-4 bg-secondary/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
        {remainingRequests} / 18 requests left
      </div>
    </main>
  );
}
