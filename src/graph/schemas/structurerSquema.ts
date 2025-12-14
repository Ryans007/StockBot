import {z} from "zod";

export const StructurerOutputSchema = z.object({
    name: z.string(),
    ingredients: z.string(),
    preparationMethod: z.string()
});

export const StructurerOutputSchemaList = z.object({
    receitas: z.array(StructurerOutputSchema),
})

export type StructurerOutputList = z.infer<typeof StructurerOutputSchemaList>;