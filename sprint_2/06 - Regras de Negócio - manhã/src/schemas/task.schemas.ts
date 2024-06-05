import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().max(255),
  description: z.string(),
  // junção de optional e nullable (undefined e null)
  dueDate: z.date().nullish(),
  isCompleted: z.boolean().default(false),
  createdAt: z.date(),
  projectId: z.number().int().positive(),
  devId: z.number().int().positive(),
});

export const taskCreateSchema = taskSchema.omit({ id: true, createdAt: true });
