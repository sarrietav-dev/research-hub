import { z } from 'zod';

const ZodId = z.number().min(1);
const CreateLiteral = z.literal('create');
const ConnectLiteral = z.literal('connect');

export const createSeedGroupSchema = z.object({
  name: z.string().min(1),
  acronym: z.string().min(1),
  description: z.string().min(1),
  researchGroupId: ZodId,
  researchLines: z.string().array(),
  creationDate: z.date(),
  programId: ZodId,
  members: z.array(
    z.discriminatedUnion('type', [
      z.object({
        type: CreateLiteral,
        name: z.string().min(1),
        identityCard: z.string(),
        institutionalCode: z.string(),
        email: z.string().email(),
      }),
      z.object({ type: ConnectLiteral, id: ZodId }),
    ]),
  ),
  leader: z.discriminatedUnion('type', [
    z.object({
      type: CreateLiteral,
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string(),
    }),
    z.object({ type: ConnectLiteral, id: ZodId }),
  ]),
  coResearchers: z.array(
    z.discriminatedUnion('type', [
      z.object({
        type: CreateLiteral,
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string(),
        programId: ZodId,
      }),
      z.object({ type: ConnectLiteral, id: ZodId }),
    ]),
  ),
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
      members: z.array(
        z.discriminatedUnion('type', [
          z.object({ type: CreateLiteral, name: z.string().min(1) }),
          z.object({ type: ConnectLiteral, id: ZodId }),
        ]),
      ),
      products: z
        .object({
          name: z.string().min(1),
          description: z.string().min(1),
          date: z.date(),
          type: z.enum(['Article', 'Thesis', 'Report', 'Poster', 'Other']),
        })
        .array(),
    })
    .array(),
});

export type CreateSeedGroupDto = z.infer<typeof createSeedGroupSchema>;
