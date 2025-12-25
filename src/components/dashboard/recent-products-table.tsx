
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import Link from 'next/link';

interface RecentProductsTableProps {
  products: Product[];
}

export function RecentProductsTable({ products }: RecentProductsTableProps) {
  const { t, language } = useTranslation();

  const getProductImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId)?.imageUrl || '';
  };

  return (
    <Card className="glassmorphic lg:col-span-3">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-headline">{t('recentProducts')}</CardTitle>
          <CardDescription>
            You have {products.length} recent products.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ms-auto gap-1">
          <Link href="/products">
            {t('viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('productName')}</TableHead>
              <TableHead className="text-center">{t('profit')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Image
                      src={getProductImage(product.image)}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                      data-ai-hint={PlaceHolderImages.find(img => img.id === product.image)?.imageHint}
                    />
                    <div>
                      <div className="font-medium">{language === 'ar' ? (product as any).nameAr : product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.category}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="font-mono">
                    +${product.profit.toFixed(2)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
