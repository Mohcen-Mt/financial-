
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import type { Product } from '@/lib/types';
import { useSales } from '@/contexts/sales-provider';
import { useProducts } from '@/contexts/products-provider';
import { useToast } from '@/hooks/use-toast';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface SellProductDialogProps {
  product: Product;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  quantitySold: z.coerce.number().int().positive('Must be positive').min(1, 'Quantity is required'),
  customerName: z.string().min(2, 'Customer name is required'),
  customerPhone: z.string().min(5, 'A valid phone is required'),
  paymentMethod: z.enum(['Cash', 'Card']),
});

type FormValues = z.infer<typeof formSchema>;

export function SellProductDialog({ product, onOpenChange }: SellProductDialogProps) {
  const { addSale } = useSales();
  const { updateProduct } = useProducts();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantitySold: 1,
      customerName: '',
      customerPhone: '',
      paymentMethod: 'Cash',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.quantitySold > product.quantity) {
        form.setError('quantitySold', { message: 'Not enough stock.' });
        return;
    }

    setIsLoading(true);

    const saleData = {
        ...data,
        productId: product.id,
    };
    addSale(saleData);

    const updatedProduct = {
        ...product,
        quantity: product.quantity - data.quantitySold,
    }
    updateProduct(updatedProduct);
    
    toast({
        title: 'Product Sold!',
        description: `${data.quantitySold} x ${product.name} sold to ${data.customerName}.`,
    });

    // Short delay to allow toast to be seen
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsLoading(false);
    onOpenChange(false);
  };
  
  const getProductImage = (imageIdentifier: string) => {
    if (imageIdentifier.startsWith('data:image/')) {
        return imageIdentifier;
    }
    return PlaceHolderImages.find((img) => img.id === imageIdentifier)?.imageUrl || '';
  };
  
  const imageUrl = getProductImage(product.image);

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Sell Product</DialogTitle>
          <DialogDescription>Record a sale for the selected product.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 rounded-lg border p-4">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                />
            ): (
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    No Image
                </div>
            )}
            <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                    {`Current Stock: ${product.quantity}`}
                </p>
            </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantitySold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Quantity Sold'}</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max={product.quantity} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Customer Name'}</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Customer Phone'}</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 234 567 890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Payment Method'}</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Card">Card</SelectItem>
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                    {'Cancel'}
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Recording Sale...' : 'Record Sale'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
