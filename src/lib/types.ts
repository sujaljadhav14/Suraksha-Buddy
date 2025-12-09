import type { ProvideSolutionsAndActionsOutput } from "@/ai/flows/provide-structured-responses";

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'example_prompts';
  content: string;
  structuredContent?: ProvideSolutionsAndActionsOutput;
  isEmergency?: boolean;
};

export type ExamplePrompt = {
  topic: string;
  prompts: string[];
};
