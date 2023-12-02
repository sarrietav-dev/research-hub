import { z } from 'zod';

export const CreatePersonSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  identityCard: z.string().min(3),
  institutionalCode: z.string().min(3),
  programId: z.number().int().positive(),
});

export type CreatePersonDto = z.infer<typeof CreatePersonSchema>;
