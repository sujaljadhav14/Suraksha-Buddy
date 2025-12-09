# **App Name**: DigitalWell

## Core Features:

- Message Categorization: Categorize user messages into predefined topics (e.g., 'WhatsApp forwards', 'Screen addiction') using a Genkit flow.
- Structured Responses: Provide explanations, solutions, a polite message, and a mini-challenge based on the categorized message. Uses reasoning tool in LLM
- Harmful Request Filter: Analyze user requests for harmful content and provide safe alternatives, or confirmation. Uses reasoning tool in LLM
- Emergency Handling: Instruct users to contact emergency services and flag the message if it indicates an emergency.
- AI Orchestration: Orchestrate AI flows via a Next.js server action, connecting chat input to AI processing and displaying a 'thinking...' indicator. Uses reasoning tool in LLM.
- Chat UI: Implement a modern, dark-themed chat layout with user and bot avatars, system responses, and a red siren for emergency alerts.
- Example Prompts: Includes example questions in an example-prompts file to guide users on what they can ask SurakshaBuddy.

## Style Guidelines:

- Primary color: Muted blue (#7597A9) for calmness and trust.
- Background color: Dark gray (#26292B) for a modern, sophisticated dark theme.
- Accent color: Light orange (#E0A96F) to highlight interactive elements and emergency alerts.
- Body and headline font: 'PT Sans' (sans-serif) for a clean and readable interface. Note: currently only Google Fonts are supported.
- Use distinct avatars for the user and the DigitalWell bot.
- Implement a prominent red siren icon to highlight emergency messages.
- A well-structured chat layout with clear message separation, optimized for readability and user experience.
- Subtle animations to indicate message processing and new message alerts.