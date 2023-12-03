import { z } from 'zod';

export const CreateCertOrgSchema = z.object({
  name: z.string().min(1),
});

export type CreateCertOrgDto = z.infer<typeof CreateCertOrgSchema>;
