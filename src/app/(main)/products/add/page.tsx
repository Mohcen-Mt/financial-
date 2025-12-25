
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, PlusCircle } from 'lucide-react';

import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/header';
import { useToast } from '@/hooks/use-toast';
import { I18nProvider } from '@/contexts/i18n-provider';

const formSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  category: z.enum(['T-shirt', 'Hoodie', 'Pants']),
  buyPrice: z.coerce.number().positive('Buy price must be positive'),
  sellPrice: z.coerce.number().positive('Sell price must be positive'),
  quantity: z.coerce.number().int().positive('Quantity must be a positive integer'),
  color: z.string().min(2, 'Color is required'),
  size: z.string().min(1, 'Size is required'),
});

type FormValues = z.infer<typeof formSchema>;

function AddProductForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: 'T-shirt',
      buyPrice: 10,
      sellPrice: 25,
      quantity: 50,
      color: '',
      size: 'M',
    },
  });

  const buyPrice = form.watch('buyPrice');
  const sellPrice = form.watch('sellPrice');
  const profit = isNaN(sellPrice) || isNaN(buyPrice) ? 0 : sellPrice - buyPrice;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    // In a real app, you'd save this to a database or localStorage
    console.log('New Product Data:', data);
    
    // Mock saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
        title: t('productAdded'),
        description: data.name,
    });

    setIsLoading(false);
    router.push('/products');
  };

  return (
    <>
      <Header title={t('addProduct')} />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {t('addNewProduct')}
            </h1>
        </div>
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle className="font-headline">{t('productDetails')}</CardTitle>
            <CardDescription>{t('productDetailsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="md:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('productName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('productNamePlaceholder')} {...field} />
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
                          <FormLabel>{t('category')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('selectCategory')} />
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
                          <FormLabel>{t('buyPrice')}</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} />
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
                          <FormLabel>{t('sellPrice')}</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="25" {...field} />
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
                          <FormLabel>{t('quantity')}</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <div className="flex h-full items-end">
                        <Card className="w-full bg-muted/50">
                            <CardContent className="p-3 text-center">
                                <p className="text-sm text-muted-foreground">{t('calculatedProfit')}</p>
                                <p className={`font-headline text-2xl font-bold ${profit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                                    ${profit.toFixed(2)}
                                </p>
                            </CardContent>
                        </Card>
                     </div>
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('color')}</FormLabel>
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
                          <FormLabel>{t('size')}</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., M, L, 32" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <FormLabel>{t('productImage')}</FormLabel>
                    <Card className="mt-2 flex aspect-square w-full items-center justify-center border-2 border-dashed">
                        <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">{t('uploadImageText')}</p>
                            <Button variant="ghost" className="mt-2" type="button">{t('selectFile')}</Button>
                        </div>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        {t('cancel')}
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? t('saving') : t('saveProduct')}
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function AddProductPage() {
    return (
        <I18nProvider>
            <AddProductForm />
        </I18nProvider>
    )
}
