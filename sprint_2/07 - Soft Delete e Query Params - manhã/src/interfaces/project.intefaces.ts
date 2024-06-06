// import { Project } from "@prisma/client";
// export type ProjectCreate = Omit<Project, "id" | "createdAt">;
// export { Project };
import { z } from "zod";
import { projectCreateSchema, projectSchema } from "../schemas";

export type Project = z.infer<typeof projectSchema>;
export type ProjectCreate = z.infer<typeof projectCreateSchema>;
