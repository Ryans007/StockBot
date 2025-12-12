import {z} from "zod";

export const StructurerOutputSchema = z.object({
    nome: z.string(),
    ingredientes_necessarios: z.string(),
    modo_preparo: z.string()
});

export const StructurerOutputSchemaList = z.object({
    receitas: z.array(StructurerOutputSchema),
})

export type StructurerOutputList = z.infer<typeof StructurerOutputSchemaList>;