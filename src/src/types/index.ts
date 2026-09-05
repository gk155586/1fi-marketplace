export interface ProductVariant {
  id: string;
  productId: string;
  colorName: string;
  colorHex: string;
  storage: string;
  price: number;
  mrp: number;
  imageUrl: string;
  galleryImages?: string;
  stockQuantity: number;
  isDefault: boolean;
  createdAt?: string | Date;
}

export interface EmiPlan {
  id: string;
  productId: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  isZeroInterest: boolean;
  minMfPledge: number;
  createdAt?: string | Date;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  badge?: string | null;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  emiPlans: EmiPlan[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
