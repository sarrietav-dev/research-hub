import { z } from 'zod';

const ZodId = z.number().min(1);

export const createSeedGroupSchema = z.object({
  name: z.string().min(1),
  acronym: z.string().min(1),
  description: z.string().min(1),
  researchGroupId: ZodId,
  researchLines: z.string().array(),
  creationDate: z.coerce.date(),
  programId: ZodId,
  period: z.string().regex(/^\d{4}-\d$/),
  members: z.array(
    z.object({
      affiliationDate: z.coerce.date(),
      functions: z.string().array(),
      isActive: z.boolean(),
      roleId: ZodId,
      id: ZodId,
    }),
  ),
  leaderId: ZodId,
  coResearchers: z.array(z.object({ id: ZodId })),
  events: z
    .object({
      description: z.string().min(1),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      type: z.enum(['Local', 'International']),
    })
    .array(),
  projects: z
    .object({
      name: z.string().min(1),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      approvedAmount: z.number().min(1),
      certifyingOrganizationId: ZodId,
      type: z.enum(['Finished', 'InProgress']),
      directorId: ZodId,
      products: z
        .object({
          name: z.string().min(1),
          description: z.string().min(1),
          date: z.coerce.date(),
          productTypeId: ZodId,
          members: z.object({ id: ZodId }).array(),
        })
        .array(),
    })
    .array(),
});

export type CreateSeedGroupDto = z.infer<typeof createSeedGroupSchema>;

export const CreateProjectSchema = z.object({
  name: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  approvedAmount: z.number().min(1),
  certifyingOrganizationId: ZodId,
  type: z.enum(['Finished', 'InProgress']),
  directorId: ZodId,
  products: z
    .object({
      name: z.string().min(1),
      description: z.string().min(1),
      date: z.coerce.date(),
      productTypeId: ZodId,
      members: z.object({ id: ZodId }).array(),
    })
    .array(),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
