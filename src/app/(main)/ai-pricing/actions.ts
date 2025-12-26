
'use server';

import type {
  AIPricingSuggestionInput,
  AIPricingSuggestionOutput,
} from '@/ai/flows/ai-pricing-suggestions';

export async function getAiPricingSuggestions(
  input: AIPricingSuggestionInput
): Promise<AIPricingSuggestionOutput> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AI features are not available in production in this template.');
  }

  // Dynamically import the flow only in non-production environments
  const { getPricingSuggestions } = await import('@/ai/flows/ai-pricing-suggestions');
  return getPricingSuggestions(input);
}
