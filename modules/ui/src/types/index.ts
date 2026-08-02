import { z } from 'zod';

export const ComponentVariantSchema = z.object({
  variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  intent: z.enum(['default', 'success', 'error', 'warning']).optional()
});

export const ButtonPropsSchema = ComponentVariantSchema.extend({
  label: z.string(),
  onClick: z.function().args(z.any()).returns(z.void()),
  disabled: z.boolean().optional(),
  loading: z.boolean().optional()
});

export const CardPropsSchema = ComponentVariantSchema.extend({
  title: z.string().optional(),
  children: z.any(),
  className: z.string().optional()
});

export type ComponentVariant = z.infer<typeof ComponentVariantSchema>;
export type ButtonProps = z.infer<typeof ButtonPropsSchema>;
export type CardProps = z.infer<typeof CardPropsSchema>;