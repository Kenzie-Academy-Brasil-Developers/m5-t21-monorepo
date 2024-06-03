import { z } from "zod";
import { managerSchema } from "./manager.schemas";

export const projectSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(255),
  description: z.string(),
  createdAt: z.date(),
  managerId: z.number().int().positive(),
});

export const projectCreateSchema = projectSchema.omit({
  id: true,
  createdAt: true,
});

export const projectDetailSchema = projectSchema
  .omit({ managerId: true })
  .extend({ manager: managerSchema });
