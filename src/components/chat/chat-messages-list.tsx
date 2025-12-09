'use client';

import { useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import { ChatMessage } from './chat-message';

interface ChatMessagesListProps {
  messages: Message[];
  isLoading: boolean;
  onPromptClick: (prompt: string) => void;
}

export function ChatMessagesList({ messages, isLoading, onPromptClick }: ChatMessagesListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto" ref={scrollRef}>
      <div className="mx-auto max-w-3xl space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} onPromptClick={onPromptClick} />
        ))}
        {isLoading && (
          <ChatMessage
            message={{
              id: 'thinking',
              role: 'assistant',
              content: '...',
            }}
            isThinking
          />
        )}
      </div>
    </div>
  );
}
