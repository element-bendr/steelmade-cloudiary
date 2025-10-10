import { z } from 'zod';

export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  variantId: z.string().optional(),
  addedAt: z.date()
});

export const CartSchema = z.object({
  id: z.string(),
  items: z.array(CartItemSchema),
  lastUpdated: z.date()
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;