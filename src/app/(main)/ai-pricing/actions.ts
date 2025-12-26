
'use server';

import type {
  AIPricingSuggestionInput,
  AIPricingSuggestionOutput,
} from '@/ai/flows/ai-pricing-suggestions';

export async function getAiPricingSuggestions(
  input: AIPricingSuggestionInput
): Promise<AIPricingSuggestionOutput> {
  // The check for NODE_ENV is now primarily for local development behavior,
  // as Webpack config will prevent this module from being bundled in production.
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AI features are not available in this environment.');
  }

  // Dynamically import the flow only in non-production environments
  const { getPricingSuggestions } = await import('@/ai/flows/ai-pricing-suggestions');
  return getPricingSuggestions(input);
}
