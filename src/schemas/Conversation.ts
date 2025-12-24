import { z } from "zod";

const ChatRequestSchema = z.object({
    user_message: z.string().min(1).trim(),
    thread_id: z.string().optional(),
});

type ChatRequest = z.infer<typeof ChatRequestSchema>;