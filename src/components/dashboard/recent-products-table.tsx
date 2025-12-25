
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import Link from 'next/link';

interface RecentProductsTableProps {
  products: Product[];
}

export function RecentProductsTable({ products }: RecentProductsTableProps) {
    const getProductImage = (imageIdentifier: string) => {
        if (imageIdentifier.startsWith('data:image/')) {
            return imageIdentifier;
        }
        return PlaceHolderImages.find((img) => img.id === imageIdentifier)?.imageUrl || '';
    };

  return (
    <Card className="glassmorphic lg:col-span-3">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-headline">{'Recent Products'}</CardTitle>
          <CardDescription>
            Your most recently added products.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ms-auto gap-1">
          <Link href="/products">
            {'View All'}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {products.length > 0 ? (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>{'Product Name'}</TableHead>
                <TableHead className="text-center">{'Profit'}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => {
                    const imageUrl = getProductImage(product.image);
                    return (
                        <TableRow key={product.id}>
                            <TableCell>
                            <div className="flex items-center gap-4">
                                {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={product.name}
                                    width={40}
                                    height={40}
                                    className="rounded-md object-cover"
                                    data-ai-hint={!product.image.startsWith('data:image/') ? PlaceHolderImages.find(img => img.id === product.image)?.imageHint : undefined}
                                />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                        No Img
                                    </div>
                                )}
                                <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-muted-foreground">{product.category}</div>
                                </div>
                            </div>
                            </TableCell>
                            <TableCell className="text-center">
                            <Badge variant="outline" className="font-mono">
                                +{product.profit.toFixed(2)} دج
                            </Badge>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No recent products.</p>
        )}
      </CardContent>
    </Card>
  );
}
