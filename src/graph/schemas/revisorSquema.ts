import {z} from 'zod';

export const RevisorOutputSchema = z.object({
    nextAgent: z.string(),
    queryWeb: z.string()
});

export type RevisorOutput = z.infer<typeof RevisorOutputSchema>;