import { z } from "zod";

export const accountSchema = z.object({
  id: z.number().positive().int(),
  fullName: z.string().max(100),
  email: z.string().email().max(100),
  password: z.string().max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const accountCreateSchema = accountSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const accountWithoutPasswordSchema = accountSchema.omit({
  password: true,
});

export const accountUpdateSchema = accountCreateSchema.partial();
