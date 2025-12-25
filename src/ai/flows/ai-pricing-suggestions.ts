'use server';

/**
 * @fileOverview This file defines the AI-powered pricing suggestion flow.
 * 
 * It suggests optimal selling prices, analyzes profit trends, warns about low-selling products, and suggests restocking items.
 * The flow takes product information as input and returns pricing and inventory recommendations.
 * 
 * - `getPricingSuggestions` -  A function that invokes the aiPricingSuggestionFlow.
 * - `AIPricingSuggestionInput` - The input type for the `getPricingSuggestions` function.
 * - `AIPricingSuggestionOutput` - The return type for the `getPricingSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPricingSuggestionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The category of the product (e.g., T-shirt, Hoodie, Pants).'),
  buyPrice: z.number().describe('The price at which the product was purchased.'),
  sellPrice: z.number().describe('The current selling price of the product.'),
  quantity: z.number().describe('The current quantity of the product in stock.'),
  color: z.string().describe('The color of the product.'),
  size: z.string().describe('The size of the product.'),
  profitMargin: z.number().describe('The profit margin for the product, between 0 and 1.'),
  pastSalesData: z.string().describe('Past sales data for the product, including dates, quantities sold, and prices.'),
});

export type AIPricingSuggestionInput = z.infer<typeof AIPricingSuggestionInputSchema>;

const AIPricingSuggestionOutputSchema = z.object({
  suggestedPrice: z.number().describe('The AI-suggested optimal selling price for the product.'),
  profitTrendAnalysis: z.string().describe('An analysis of the profit trends for the product.'),
  lowSellingWarning: z.string().describe('A warning message if the product is selling poorly.'),
  restockSuggestion: z.string().describe('A suggestion for restocking the product, if needed.'),
  dailySmartTip: z.string().describe('A daily smart tip related to pricing or inventory management.'),
});

export type AIPricingSuggestionOutput = z.infer<typeof AIPricingSuggestionOutputSchema>;

export async function getPricingSuggestions(input: AIPricingSuggestionInput): Promise<AIPricingSuggestionOutput> {
  return aiPricingSuggestionFlow(input);
}

const aiPricingSuggestionPrompt = ai.definePrompt({
  name: 'aiPricingSuggestionPrompt',
  input: {schema: AIPricingSuggestionInputSchema},
  output: {schema: AIPricingSuggestionOutputSchema},
  prompt: `You are an AI assistant designed to provide pricing and inventory suggestions for a freelancer selling clothing items.

  Analyze the following product information and provide the suggested price, profit trend analysis, low selling warning, restock suggestion, and a daily smart tip.

  Product Name: {{{productName}}}
  Category: {{{category}}}
  Buy Price: {{{buyPrice}}}
  Sell Price: {{{sellPrice}}}
  Quantity: {{{quantity}}}
  Color: {{{color}}}
  Size: {{{size}}}
  Profit Margin: {{{profitMargin}}}
  Past Sales Data: {{{pastSalesData}}}

  Respond with the following output format:
  {
    "suggestedPrice": "The AI-suggested optimal selling price for the product.",
    "profitTrendAnalysis": "An analysis of the profit trends for the product.",
    "lowSellingWarning": "A warning message if the product is selling poorly.",
    "restockSuggestion": "A suggestion for restocking the product, if needed.",
    "dailySmartTip": "A daily smart tip related to pricing or inventory management."
  }`,
});

const aiPricingSuggestionFlow = ai.defineFlow(
  {
    name: 'aiPricingSuggestionFlow',
    inputSchema: AIPricingSuggestionInputSchema,
    outputSchema: AIPricingSuggestionOutputSchema,
  },
  async input => {
    const {output} = await aiPricingSuggestionPrompt(input);
    return output!;
  }
);
