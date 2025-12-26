import { config } from 'dotenv';
config();

if (process.env.NODE_ENV === 'development') {
    require('@/ai/flows/ai-pricing-suggestions.ts');
}
