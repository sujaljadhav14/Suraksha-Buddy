'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ExamplePromptsDisplay } from './example-prompts-display';


interface ChatMessageProps {
  message: Message;
  isThinking?: boolean;
  onPromptClick?: (prompt: string) => void;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste the message.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7">
      {copied ? <Icons.Check className="h-4 w-4 text-green-500" /> : <Icons.Copy className="h-4 w-4" />}
      <span className="sr-only">Copy message</span>
    </Button>
  );
}

function StructuredContentDisplay({ content, category }: { content: NonNullable<Message['structuredContent']>, category: string }) {
  return (
    <div className="space-y-6 mt-4">
      <div className="text-lg font-bold font-headline">{category}</div>

      {content.explanation && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold text-base">
            <Icons.Info className="h-5 w-5 text-primary" />
            <span>The Issue</span>
          </div>
          <p className="text-sm text-foreground/80">{content.explanation}</p>
        </div>
      )}

      {content.solutions && content.solutions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold text-base">
            <Icons.ShieldCheck className="h-5 w-5 text-primary" />
            <span>Practical Solutions</span>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/80">
            {content.solutions.map((solution, i) => (
              <li key={i}>{solution}</li>
            ))}
          </ul>
        </div>
      )}

      {content.politeMessage && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold text-base">
            <Icons.MessageSquareQuote className="h-5 w-5 text-primary" />
            <span>Polite Message</span>
          </div>
          <Card className="bg-background/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <p className="italic text-sm text-foreground/80">{content.politeMessage}</p>
                <CopyButton text={content.politeMessage} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {content.miniChallenge && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold text-base">
            <Icons.Target className="h-5 w-5 text-primary" />
            <span>Mini Challenge</span>
          </div>
          <p className="text-sm text-foreground/80">{content.miniChallenge}</p>
        </div>
      )}
    </div>
  );
}


export function ChatMessage({ message, isThinking = false, onPromptClick }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const isExamplePrompts = message.role === 'example_prompts';

  if (isExamplePrompts && onPromptClick) {
    return <ExamplePromptsDisplay onPromptClick={onPromptClick} />;
  }

  const avatarComponent = (
    <Avatar className="h-12 w-12 shadow-lg ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
      {isUser ? (
        <>
          <AvatarImage src="/user-avatar.png" alt="User" />
          <AvatarFallback><Icons.User /></AvatarFallback>
        </>
      ) : (
        <>
          <AvatarImage src="/bot-avatar.png" alt="SurakshaBuddy" />
          <AvatarFallback><Icons.Bot /></AvatarFallback>
        </>
      )}
    </Avatar>
  );



  const categoryMatch = message.content.match(/Here's some information about (.+?):/);
  const category = message.structuredContent && categoryMatch ? categoryMatch[1].charAt(0).toUpperCase() + categoryMatch[1].slice(1) : '';


  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && avatarComponent}
      <div
        className={cn(
          'max-w-2xl rounded-lg p-3.5 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card',
          isSystem && 'w-full max-w-full bg-yellow-900/20 text-yellow-200 border border-yellow-800/50 text-center',
          message.isEmergency && 'bg-destructive/80 text-destructive-foreground'
        )}
      >
        {isThinking ? (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4 whitespace-pre-wrap text-sm leading-relaxed">
            {message.isEmergency && (
              <div className="flex items-center gap-2 font-bold">
                <Icons.Siren className="h-5 w-5 animate-pulse text-white" />
                <span>EMERGENCY</span>
                <Icons.Siren className="h-5 w-5 animate-pulse text-white" />
              </div>
            )}

            {!message.structuredContent && <p>{message.content}</p>}

            {message.structuredContent && (
              <StructuredContentDisplay content={message.structuredContent} category={category} />
            )}
          </div>
        )}
      </div>
      {isUser && avatarComponent}
    </div>
  );
}
