import type { Message } from "@/lib/types";
import { SurakshaBuddyLogo } from "@/components/icons";
import { ChatMessagesList } from "./chat-messages-list";
import { ChatInput } from "./chat-input";

interface ChatLayoutProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export function ChatLayout({ messages, isLoading, onSendMessage }: ChatLayoutProps) {

  return (
    <div className="relative flex h-screen flex-col">
      <header className="flex items-center justify-center p-4 border-b">
        <SurakshaBuddyLogo />
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <ChatMessagesList messages={messages} isLoading={isLoading} onPromptClick={onSendMessage}/>
      </div>

      <div className="p-4 md:p-6 bg-background/75 backdrop-blur-sm border-t">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
