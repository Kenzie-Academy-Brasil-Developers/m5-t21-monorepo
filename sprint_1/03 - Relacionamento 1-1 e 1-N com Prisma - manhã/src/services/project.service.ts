import { prisma } from "../../prisma/prisma.client";
import { Project, ProjectCreate } from "../interfaces";

export class ProjectService {
  public create = async (payload: ProjectCreate) => {
    return await prisma.project.create({ data: payload });
  };

  public findAll = async () => {
    return await prisma.project.findMany({ include: { manager: true } });
  };

  public findOne = async (projectId: number) => {
    return await prisma.project.findFirst({ where: { id: projectId } });
  };
}
