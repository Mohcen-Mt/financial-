
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/header';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/contexts/products-provider';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ImagePicker } from '@/components/products/image-picker';

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Product name is required'),
  category: z.enum(['T-shirt', 'Hoodie', 'Pants']),
  buyPrice: z.coerce.number().positive('Buy price must be positive'),
  sellPrice: z.coerce.number().positive('Sell price must be positive'),
  quantity: z.coerce.number().int().positive('Quantity must be a positive integer'),
  color: z.string().min(2, 'Color is required'),
  size: z.string().min(1, 'Size is required'),
  image: z.string().min(1, 'Image is required'),
  addedDate: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { getProductById, updateProduct } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (productId) {
      const existingProduct = getProductById(productId);
      setProduct(existingProduct);
      if (existingProduct) {
        form.reset(existingProduct);
      }
    }
  }, [productId, getProductById, form]);

  const buyPrice = form.watch('buyPrice');
  const sellPrice = form.watch('sellPrice');
  const imageValue = form.watch('image');
  const profit = isNaN(sellPrice) || isNaN(buyPrice) ? 0 : sellPrice - buyPrice;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!product) return;
    
    setIsLoading(true);
    
    updateProduct({ ...data, profit: data.sellPrice - data.buyPrice });
    
    toast({
        title: 'Product Updated',
        description: data.name,
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsLoading(false);
    router.push('/products');
  };
  
  const getSelectedImage = (value: string) => {
    if (value.startsWith('data:image/')) {
        return value;
    }
    return PlaceHolderImages.find(p => p.id === value)?.imageUrl || '';
  }

  const selectedImageUrl = getSelectedImage(imageValue || '');


  if (!product) {
    return (
      <div suppressHydrationWarning>
        <Header title={'Edit Product'} />
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <p>Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      <Header title={'Edit Product'} />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8" suppressHydrationWarning>
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {`Edit: ${product.name}`}
            </h1>
        </div>
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle className="font-headline">{'Product Details'}</CardTitle>
            <CardDescription>{'Update the information for your product.'}</CardDescription>
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
                          <FormLabel>{'Product Name'}</FormLabel>
                          <FormControl>
                            <Input placeholder={'e.g., Cool Summer T-Shirt'} {...field} />
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
                                <SelectValue placeholder={'Select a category'} />
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
                          <FormLabel>{'Quantity'}</FormLabel>                          <FormControl>
                            <Input type="number" placeholder="100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <div className="flex h-full items-end">
                        <Card className="w-full bg-muted/50">
                            <CardContent className="p-3 text-center">
                                <p className="text-sm text-muted-foreground">{'Calculated Profit'}</p>
                                <p className={`font-headline text-2xl font-bold ${profit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                                    {profit.toFixed(2)} دج
                                </p>
                            </CardContent>
                        </Card>
                     </div>
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
                  </div>
                  <div className="md:col-span-1">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{'Product Image'}</FormLabel>
                                <Card className="mt-2 flex aspect-square w-full items-center justify-center overflow-hidden">
                                    {selectedImageUrl ? (
                                        <Image
                                            src={selectedImageUrl}
                                            alt="Selected product image"
                                            width={400}
                                            height={400}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center text-muted-foreground">No image selected</div>
                                    )}
                                </Card>
                                <FormControl>
                                    <ImagePicker value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        {'Cancel'}
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
