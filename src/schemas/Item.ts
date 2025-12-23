import { z } from "zod";

export const ItemSchema = z.object({
  name: z.string().min(1).trim(),
  description: z.string().min(1).trim(),
  price: z.number().positive(),
  amount: z.number().nonnegative()
})

export type Item = z.infer<typeof ItemSchema>