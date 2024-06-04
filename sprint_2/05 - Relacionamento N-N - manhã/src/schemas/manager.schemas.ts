import { z } from "zod";

export const managerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(20),
  email: z.string().email().max(255),
  createdAt: z.date(),
});

export const managerCreateSchema = managerSchema.omit({
  id: true,
  createdAt: true,
});
