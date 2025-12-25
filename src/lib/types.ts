
import type { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  category: 'T-shirt' | 'Hoodie' | 'Pants';
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  color: string;
  size: string;
  image: (typeof PlaceHolderImages)[number]['id'];
  profit: number;
  addedDate: string;
};

export type Sale = {
  id: string;
  productId: string;
  quantitySold: number;
  customerName: string;
  customerPhone: string;
  paymentMethod: 'Cash' | 'Card';
  saleDate: string;
  totalProfit: number;
};
