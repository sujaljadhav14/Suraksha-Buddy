import { config } from 'dotenv';
config();

import '@/ai/flows/categorize-user-message.ts';
import '@/ai/flows/provide-structured-responses.ts';
import '@/ai/flows/handle-emergency-requests.ts';
