import { examplePrompts } from '@/lib/example-prompts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExamplePromptsDisplayProps {
  onPromptClick: (prompt: string) => void;
}

export function ExamplePromptsDisplay({ onPromptClick }: ExamplePromptsDisplayProps) {
  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up my-8">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold font-headline">Need some ideas?</h2>
        <p className="text-muted-foreground mt-1">Here are some things you can ask me:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {examplePrompts.map((topic) => (
          <Card key={topic.topic} className="flex flex-col bg-card/50">
            <CardHeader className="p-4">
              <CardTitle className="text-base font-headline">{topic.topic}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-between p-4 pt-0">
              <ul className="space-y-1.5">
                {topic.prompts.map((prompt) => (
                  <li key={prompt}>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-left whitespace-normal text-muted-foreground hover:text-accent text-sm"
                      onClick={() => onPromptClick(prompt)}
                    >
                      "{prompt}"
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
