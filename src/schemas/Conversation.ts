import { z } from "zod";

export const ConversationSchema = z.object({
    user_message: z.string().min(1).trim(),
    thread_id: z.string().optional(),
});

export type Conversation = z.infer<typeof ConversationSchema>;