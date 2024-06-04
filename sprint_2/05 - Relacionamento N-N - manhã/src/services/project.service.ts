import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors/api.errors";
import { Project, ProjectCreate } from "../interfaces";
import { projectDetailSchema } from "../schemas";
import { ManagerService } from "./manager.service";

export class ProjectService {
  public create = async (payload: ProjectCreate) => {
    const managerService = new ManagerService();
    await managerService.findOne(payload.managerId);

    const project = await prisma.project.create({ data: payload });

    return project;
  };

  public findAll = async () => {
    // return await prisma.project.findMany({ include: { manager: true } });
    return await prisma.project.findMany();
  };

  public findOne = async (projectId: number) => {
    const foundProject = await prisma.project.findFirst({
      where: { id: projectId },
      include: { manager: true },
    });

    if (!foundProject) {
      throw new ApiError("Project not found", 404);
    }

    return projectDetailSchema.parse(foundProject);
  };
}
