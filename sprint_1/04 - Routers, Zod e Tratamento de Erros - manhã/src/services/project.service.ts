import { prisma } from "../../prisma/prisma.client";
import { Project, ProjectCreate } from "../interfaces";
import { projectDetailSchema } from "../schemas";

export class ProjectService {
  public create = async (payload: ProjectCreate) => {
    return await prisma.project.create({ data: payload });
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

    return projectDetailSchema.parse(foundProject);
  };
}
