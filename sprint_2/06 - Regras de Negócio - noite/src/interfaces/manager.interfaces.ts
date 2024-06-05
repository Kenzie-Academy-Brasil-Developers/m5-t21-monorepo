import { z } from "zod";
import { managerCreateSchema, managerSchema } from "../schemas";

export type Manager = z.infer<typeof managerSchema>;
export type ManagerCreate = z.infer<typeof managerCreateSchema>;
