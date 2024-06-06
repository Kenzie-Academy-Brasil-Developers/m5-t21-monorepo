import { z } from "zod";

export const devSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(255),
  createdAt: z.date(),
});

export const devCreateSchema = devSchema.omit({ id: true, createdAt: true });
