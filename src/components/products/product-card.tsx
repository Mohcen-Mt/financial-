
'use client';

import Image from 'next/image';
import { MoreHorizontal, Edit, Trash2, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onSell: () => void;
}

const LOW_STOCK_THRESHOLD = 20;

export function ProductCard({ product, onEdit, onDelete, onSell }: ProductCardProps) {
  const getProductImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId)?.imageUrl || '';
  };

  const isLowStock = product.quantity < LOW_STOCK_THRESHOLD;

  return (
    <Card className="glassmorphic overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl">
      <CardHeader className="relative p-0">
        <Image
          src={getProductImage(product.image)}
          alt={product.name}
          width={400}
          height={300}
          className="aspect-video w-full object-cover"
          data-ai-hint={PlaceHolderImages.find(img => img.id === product.image)?.imageHint}
        />
        {isLowStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            {'Low Stock'}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
            <div className="grid gap-1">
                <CardTitle className="font-headline text-lg leading-tight">
                    {product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <AlertDialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onSell}>
                            <ShoppingBag className="me-2 h-4 w-4" />
                            <span>{'Sell'}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onEdit}>
                            <Edit className="me-2 h-4 w-4" />
                            <span>{'Edit'}</span>
                        </DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                <Trash2 className="me-2 h-4 w-4" />
                                <span>{'Delete'}</span>
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product from your list.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
                <p className="text-xs text-muted-foreground">{'Sell Price'}</p>
                <p className="font-semibold font-mono">${product.sellPrice.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">{'Profit'}</p>
                <p className="font-semibold text-primary font-mono">+${product.profit.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">{'Quantity'}</p>
                <p className="font-semibold font-mono">{product.quantity}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
