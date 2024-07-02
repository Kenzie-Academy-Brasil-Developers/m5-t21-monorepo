import { z } from "zod";

export const bookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(100),
  publicationYear: z.number().positive(),
  available: z.boolean().default(true),
});

export const bookCreateSchema = bookSchema.omit({ id: true });
