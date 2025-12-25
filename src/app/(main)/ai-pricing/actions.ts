
'use server';

import {
  getPricingSuggestions,
  type AIPricingSuggestionInput,
  type AIPricingSuggestionOutput,
} from '@/ai/flows/ai-pricing-suggestions';

export async function getAiPricingSuggestions(
  input: AIPricingSuggestionInput
): Promise<AIPricingSuggestionOutput> {
  return getPricingSuggestions(input);
}
