
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/layout/header';
import { getAiPricingSuggestions } from './actions';
import type { AIPricingSuggestionOutput } from '@/ai/flows/ai-pricing-suggestions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BrainCircuit, DollarSign, Lightbulb, Package, TrendingDown, TrendingUp } from 'lucide-react';

const formSchema = z.object({
  productName: z.string().min(2, 'Product name is required'),
  category: z.enum(['T-shirt', 'Hoodie', 'Pants']),
  buyPrice: z.coerce.number().positive('Buy price must be positive'),
  sellPrice: z.coerce.number().positive('Sell price must be positive'),
  quantity: z.coerce.number().int().positive('Quantity must be a positive integer'),
  color: z.string().min(2, 'Color is required'),
  size: z.string().min(1, 'Size is required'),
  profitMargin: z.coerce.number().min(0).max(1, 'Profit margin must be between 0 and 1'),
  pastSalesData: z.string().min(10, 'Please provide some sales context'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AiPricingPage() {
  const [suggestions, setSuggestions] = useState<AIPricingSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      category: 'T-shirt',
      buyPrice: 1000,
      sellPrice: 2500,
      quantity: 100,
      color: 'Black',
      size: 'M',
      profitMargin: 0.6,
      pastSalesData: 'Sold 20 units last month at 2500 DZD. Similar products are popular.',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await getAiPricingSuggestions(data);
      setSuggestions(result);
    } catch (err) {
      setError('Failed to get AI suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title={'AI Pricing'} />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle className="font-headline">{'Get AI Suggestions'}</CardTitle>
            <CardDescription>{'Product Description'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Product Name'}</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Cool Summer T-Shirt" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Category'}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="T-shirt">T-shirt</SelectItem>
                            <SelectItem value="Hoodie">Hoodie</SelectItem>
                            <SelectItem value="Pants">Pants</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="buyPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Buy Price'}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sellPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Sell Price'}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Quantity'}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profitMargin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Profit Margin'}</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="0.6" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Color'}</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Black" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{'Size'}</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., M, L, 32" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="pastSalesData"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{'Past Sales Data'}</FormLabel>
                          <FormControl>
                            <Textarea placeholder={'Past Sales Data'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Generating...' : 'Generate Suggestions'}
                  <BrainCircuit className="ms-2 h-4 w-4" />
                </Button>
              </form>
            </Form>

            {suggestions && (
              <div className="mt-8 space-y-4">
                <h3 className="font-headline text-2xl font-bold">{'AI Suggestions'}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <Alert>
                        <DollarSign className="h-4 w-4" />
                        <AlertTitle>{'Suggested Price'}</AlertTitle>
                        <AlertDescription className="font-headline text-lg font-bold text-primary">{suggestions.suggestedPrice.toFixed(2)} DZD</AlertDescription>
                    </Alert>
                    <Alert>
                        <TrendingUp className="h-4 w-4" />
                        <AlertTitle>{'Profit Trend Analysis'}</AlertTitle>
                        <AlertDescription>{suggestions.profitTrendAnalysis}</AlertDescription>
                    </Alert>
                    <Alert>
                        <TrendingDown className="h-4 w-4" />
                        <AlertTitle>{'Low Selling Warning'}</AlertTitle>
                        <AlertDescription>{suggestions.lowSellingWarning}</AlertDescription>
                    </Alert>
                    <Alert>
                        <Package className="h-4 w-4" />
                        <AlertTitle>{'Restock Suggestion'}</AlertTitle>
                        <AlertDescription>{suggestions.restockSuggestion}</AlertDescription>
                    </Alert>
                    <div className="md:col-span-2">
                        <Alert className="border-primary/50 text-primary">
                            <Lightbulb className="h-4 w-4 text-primary" />
                            <AlertTitle>{'Daily Smart Tip'}</AlertTitle>
                            <AlertDescription>{suggestions.dailySmartTip}</AlertDescription>
                        </Alert>
                    </div>
                </div>
              </div>
            )}
            {error && <p className="mt-4 text-destructive">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
