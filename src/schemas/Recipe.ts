import { z } from "zod";

export const RecipeSchema = z.object({
    name: z.string().min(1).trim(),
    ingredients: z.string().min(1).trim(),
    preparationMethod: z.string().min(1).trim()
})

export type Recipe = z.infer<typeof RecipeSchema>