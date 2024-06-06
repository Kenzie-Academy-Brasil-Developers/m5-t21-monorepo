import { z } from "zod";
import { devCreateSchema, devSchema } from "../schemas";

export type Dev = z.infer<typeof devSchema>;
export type DevCreate = z.infer<typeof devCreateSchema>;
