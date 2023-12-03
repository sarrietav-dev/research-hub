import { z } from 'zod';

export const CreateProgramSchema = z.object({
  name: z.string().min(3).max(255),
});

export type CreateProgramDto = z.infer<typeof CreateProgramSchema>;
