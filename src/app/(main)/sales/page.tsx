
'use client';

import { useMemo } from 'react';
import { useSales } from '@/contexts/sales-provider';
import { useProducts } from '@/contexts/products-provider';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingBag } from 'lucide-react';

export default function SalesPage() {
  const { sales } = useSales();
  const { products } = useProducts();

  const salesWithProductDetails = useMemo(() => {
    return sales.map(sale => {
      const product = products.find(p => p.id === sale.productId);
      return {
        ...sale,
        productName: product?.name || 'Unknown Product',
        productImage: product?.image || '',
        productCategory: product?.category || 'N/A'
      };
    }).sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());
  }, [sales, products]);

  const getProductImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId)?.imageUrl || '';
  };

  return (
    <>
      <Header title={'Sales'} />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle className="font-headline">{'Recent Sales'}</CardTitle>
            <CardDescription>{`You have made ${salesWithProductDetails.length} sales.`}</CardDescription>
          </CardHeader>
          <CardContent>
            {salesWithProductDetails.length > 0 ? (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>{'Product'}</TableHead>
                    <TableHead className="hidden md:table-cell">{'Customer'}</TableHead>
                    <TableHead className="text-center">{'Quantity'}</TableHead>
                    <TableHead className="text-center">{'Total Profit'}</TableHead>
                    <TableHead className="hidden md:table-cell text-center">{'Payment'}</TableHead>
                    <TableHead className="text-right">{'Date'}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {salesWithProductDetails.map(sale => (
                    <TableRow key={sale.id}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Image
                                src={getProductImage(sale.productImage)}
                                alt={sale.productName}
                                width={40}
                                height={40}
                                className="rounded-md object-cover"
                                data-ai-hint={PlaceHolderImages.find(img => img.id === sale.productImage)?.imageHint}
                                />
                                <div>
                                    <div className="font-medium">{sale.productName}</div>
                                    <div className="text-sm text-muted-foreground">{sale.productCategory}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <div className="font-medium">{sale.customerName}</div>
                            <div className="text-sm text-muted-foreground">{sale.customerPhone}</div>
                        </TableCell>
                        <TableCell className="text-center font-mono">{sale.quantitySold}</TableCell>
                        <TableCell className="text-center">
                            <Badge variant="outline" className="font-mono">
                                +${sale.totalProfit.toFixed(2)}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-center">{sale.paymentMethod}</TableCell>
                        <TableCell className="text-right font-mono">{new Date(sale.saleDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            ) : (
                <div className="flex h-[40vh] flex-col items-center justify-center text-center">
                    <div className="mx-auto rounded-full bg-primary/10 p-4">
                        <ShoppingBag className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="mt-4 font-headline text-2xl font-semibold">No Sales Yet</h3>
                    <p className="text-muted-foreground">Go to the products page to start selling items.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
