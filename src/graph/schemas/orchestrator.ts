import { z } from 'zod';

export const OrchestratorOutputSchema = z.object({
    nextAgent: z.string(),
    querySQL: z.string().optional().default(""),
    orchestrationExplanation: z.string()
});

export type OrchestratorOutput = z.infer<typeof OrchestratorOutputSchema>;