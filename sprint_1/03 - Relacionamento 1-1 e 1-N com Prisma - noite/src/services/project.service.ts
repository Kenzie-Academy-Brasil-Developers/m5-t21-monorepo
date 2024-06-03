import { Project, ProjectCreate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";

export class ProjectService {
  public create = async (payload: ProjectCreate) => {
    const newProject = await prisma.project.create({ data: payload });

    return newProject;
  };

  public findAll = async () => {
    return await prisma.project.findMany();
  };

  public findOne = async (projectId: number) => {
    const foundProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    return foundProject;
  };
}
