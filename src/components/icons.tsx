import { User, Sparkles, Siren, Copy, Check, Info, ShieldCheck, MessageSquareQuote, Target } from 'lucide-react';

export const Icons = {
  User,
  Bot: Sparkles,
  Siren,
  Copy,
  Check,
  Info,
  ShieldCheck,
  MessageSquareQuote,
  Target
};

export function SurakshaBuddyLogo() {
  return (
    <div className="flex items-center justify-center gap-2" aria-label="SurakshaBuddy Logo">
      <Icons.Bot className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold font-headline">SurakshaBuddy</span>
    </div>
  )
}
