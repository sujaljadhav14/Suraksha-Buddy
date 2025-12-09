'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { ArrowUp, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isListening,
    transcript,
    isSupported,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isListening ? "Listening..." : "Ask about digital wellness..."}
        aria-label="Chat input"
        rows={1}
        className={cn(
          "pr-24 min-h-[48px] resize-none",
          isListening && "border-red-500 border-2"
        )}
        disabled={isLoading || isListening}
      />

      {/* Microphone Button */}
      {isSupported && (
        <Button
          type="button"
          size="icon"
          onClick={handleMicClick}
          className={cn(
            "absolute right-14 top-1/2 -translate-y-1/2 rounded-full",
            isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-secondary hover:bg-secondary/80"
          )}
          disabled={isLoading}
          aria-label={isListening ? "Stop recording" : "Start voice input"}
          title={speechError || (isListening ? "Click to stop" : "Click to speak")}
        >
          {isListening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
      )}

      {/* Send Button */}
      <Button
        type="submit"
        size="icon"
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 rounded-full",
          "bg-primary hover:bg-primary/90"
        )}
        disabled={isLoading || !input.trim() || isListening}
        aria-label="Send message"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      {/* Error Display */}
      {speechError && (
        <div className="absolute -top-8 left-0 right-0 text-xs text-red-500 text-center">
          {speechError}
        </div>
      )}
    </form>
  );
}
