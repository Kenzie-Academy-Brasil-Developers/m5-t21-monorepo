import { z } from "zod";
import { projectCreateSchema, projectSchema } from "../schemas";

export type Project = z.infer<typeof projectSchema>;
export type ProjectCreate = z.infer<typeof projectCreateSchema>;
