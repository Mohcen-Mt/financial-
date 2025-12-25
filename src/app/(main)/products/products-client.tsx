
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlusCircle,
  LayoutGrid,
  List,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  ShoppingBag,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import type { Product } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { ProductCard } from '@/components/products/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useProducts } from '@/contexts/products-provider';
import { useToast } from '@/hooks/use-toast';
import { SellProductDialog } from '@/components/products/sell-product-dialog';

const LOW_STOCK_THRESHOLD = 20;

export function ProductsClient() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { products, deleteProduct } = useProducts();
  const { toast } = useToast();
  const router = useRouter();

  const [productToSell, setProductToSell] = useState<Product | null>(null);

  const categories = useMemo(() => {
    if (!products) return [];
    const allCategories = products.map((p) => p.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const name = product.name;
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);
    
  const getProductImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId)?.imageUrl || '';
  };

  const handleDelete = (productId: string) => {
    const productToDelete = products.find(p => p.id === productId);
    if (!productToDelete) return;

    deleteProduct(productId);
    toast({
        title: "Product Deleted",
        description: `${productToDelete.name} has been removed.`,
        variant: "destructive",
    });
  }

  const handleEdit = (productId: string) => {
    router.push(`/products/edit/${productId}`);
  }
  
  const ProductActions = ({ product }: { product: Product }) => (
    <AlertDialog>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setProductToSell(product)}>
                    <ShoppingBag className="me-2 h-4 w-4" />
                    <span>{'Sell'}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                    <Edit className="me-2 h-4 w-4" />
                    <span>{'Edit'}</span>
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      onSelect={(e) => e.preventDefault()}
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    >
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
                    This action cannot be undone. This will permanently delete the product {'"'}<b>{product.name}</b>{'"'} from your list.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(product.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );

  if (!products) {
    return (
      <>
        <Header title={'Products'} />
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8" suppressHydrationWarning>
            <div className="flex h-[60vh] items-center justify-center">
                <p>Loading products...</p>
            </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header title={'Products'} />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8" suppressHydrationWarning>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:gap-2">
                <Input
                placeholder={'Filter by name...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full md:w-[250px]"
                />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-9 w-full md:w-[180px]">
                    <SelectValue placeholder={'Filter by category...'} />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <div className="hidden rounded-md bg-muted p-0.5 md:flex">
                <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setViewMode('grid')}
                    aria-label={'Grid View'}
                >
                    <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                    variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setViewMode('table')}
                    aria-label={'Table View'}
                >
                    <List className="h-4 w-4" />
                </Button>
                </div>
                <Button asChild className="gap-1">
                    <Link href="/products/add">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {'Add Product'}
                        </span>
                    </Link>
                </Button>
            </div>
        </div>

        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                >
                    <ProductActions product={product} />
                </ProductCard>
              ))}
            </div>
          ) : (
            <Card className="glassmorphic">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>{'Product Name'}</TableHead>
                            <TableHead className="hidden md:table-cell">{'Category'}</TableHead>
                            <TableHead className="text-center">{'Sell Price'}</TableHead>
                            <TableHead className="text-center">{'Profit'}</TableHead>
                            <TableHead className="text-center">{'Quantity'}</TableHead>
                            <TableHead className="hidden md:table-cell text-center">{'Added Date'}</TableHead>
                            <TableHead>
                            <span className="sr-only">{'Actions'}</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {filteredProducts.map((product) => {
                            const isLowStock = product.quantity < LOW_STOCK_THRESHOLD;
                            return (
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
                                        <div className="font-medium">{product.name}</div>
                                        {isLowStock && <Badge variant="destructive" className="mt-1">{'Low Stock'}</Badge>}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                                <TableCell className="text-center font-mono">{product.sellPrice.toFixed(2)} دج</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="outline" className="font-mono">
                                        +{product.profit.toFixed(2)} دج
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center font-mono">{product.quantity}</TableCell>
                                <TableCell className="hidden md:table-cell text-center font-mono">{product.addedDate}</TableCell>
                                <TableCell>
                                    <ProductActions product={product} />
                                </TableCell>
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          )
        ) : (
            <Card className="mt-4 flex h-[60vh] flex-col items-center justify-center glassmorphic">
                <CardHeader>
                    <div className="mx-auto rounded-full bg-primary/10 p-4">
                        <Package className="h-12 w-12 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="text-center">
                    <CardTitle className="font-headline text-2xl">{'No Products Found'}</CardTitle>
                    <CardDescription className="mt-2">{"You haven't added any products yet. Get started by adding one."}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="mt-4 gap-1">
                        <Link href="/products/add">
                            <PlusCircle className="h-3.5 w-3.5" />
                            {'Add Product'}
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        )}
      </div>
      {productToSell && (
        <SellProductDialog
          product={productToSell}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setProductToSell(null);
            }
          }}
        />
      )}
    </>
  );
}

    