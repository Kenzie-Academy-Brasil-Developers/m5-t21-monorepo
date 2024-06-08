import { z } from "zod";

export const managerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(20),
  email: z.string().email().max(255),
  isActive: z.boolean().default(false),
  updatedAt: z.date(),
  createdAt: z.date(),
});

// Omit<Type, "id" | "createdAt">
// Pick<Type, "name" | "email">
// Partial<Type>
export const managerCreateSchema = managerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});

export const managerUpdateSchema = managerCreateSchema.partial();
