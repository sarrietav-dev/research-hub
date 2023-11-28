import { z } from 'zod';

const ZodId = z.number().min(1);

export const createSeedGroupSchema = z.object({
  name: z.string().min(1),
  acronym: z.string().min(1),
  description: z.string().min(1),
  researchGroupId: ZodId,
  researchLines: z.string().array(),
  creationDate: z.date(),
  programId: ZodId,
  period: z.string().regex(/^\d{4}-\d$/),
  members: z.array(
    z.object({
      affiliationDate: z.date(),
      functions: z.string().array(),
      isActive: z.boolean(),
      roleId: ZodId,
      memberId: ZodId,
    }),
  ),
  leader: z.object({ id: ZodId }),
  coResearchers: z.array(z.object({ id: ZodId })),
  events: z
    .object({
      description: z.string().min(1),
      startDate: z.date(),
      endDate: z.date(),
      type: z.enum(['Local', 'International']),
    })
    .array(),
  projects: z
    .object({
      name: z.string().min(1),
      startDate: z.date(),
      endDate: z.date().optional(),
      approvedAmount: z.number().min(1),
      certifyingOrganizationId: ZodId,
      type: z.enum(['Finished', 'InProgress']),
      members: z.array(z.object({ id: ZodId })),
      products: z
        .object({
          name: z.string().min(1),
          description: z.string().min(1),
          date: z.date(),
          productTypeId: ZodId,
        })
        .array(),
    })
    .array(),
});

export type CreateSeedGroupDto = z.infer<typeof createSeedGroupSchema>;
