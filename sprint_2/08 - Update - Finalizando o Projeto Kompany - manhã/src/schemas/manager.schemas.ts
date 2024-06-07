import { z } from "zod";

export const managerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(20),
  email: z.string().email().max(255),
  isActive: z.boolean().default(true),
  updatedAt: z.date(),
  createdAt: z.date(),
});

// Omit<T, "chave1" | "chave2">
export const managerCreateSchema = managerSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  isActive: true,
});

// Partial<>
export const managerUpdateSchema = managerCreateSchema.partial();
