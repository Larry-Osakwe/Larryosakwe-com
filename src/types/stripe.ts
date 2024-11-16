export type CheckoutMode = 'payment' | 'subscription';

export interface StripePlan {
  priceId: string;
  name: string;
  description: string;
  price: number;
  priceAnchor?: number;
  mode: CheckoutMode;
  isFeatured: boolean;
  features: { name: string }[];
  couponId?: string;
}

export interface StripeConfig {
  plans: StripePlan[];
}