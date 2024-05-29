import { Project } from "@prisma/client";

export type ProjectCreate = Omit<Project, "id" | "createdAt">;

export { Project };
