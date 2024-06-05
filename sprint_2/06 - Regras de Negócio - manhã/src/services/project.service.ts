import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors/api.errors";
import { Project, ProjectCreate } from "../interfaces";
import { projectDetailSchema } from "../schemas";
import { DevService } from "./dev.service";
import { ManagerService } from "./manager.service";

export class ProjectService {
  private devService = new DevService();

  public isDevInProject = async (projectId: number, devId: number) => {
    // 1. projectId se refere a um projeto que existe no Db?
    const foundProject = await this.findOne(projectId);

    // 2. devId se refere a um dev que existe no Db?
    const foundDev = await this.devService.findOne(devId);

    // return foundProject.devs.includes(foundDev);
    const isDevInProject = foundProject.devs.find((dev) => dev.id === devId);

    return Boolean(isDevInProject);
  };

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
      include: { manager: true, devs: true },
    });

    if (!foundProject) {
      throw new ApiError("Project not found", 404);
    }

    return projectDetailSchema.parse(foundProject);
  };

  public addDev = async (projectId: number, devId: number) => {
    // await this.findOne(projectId);
    // await this.devService.findOne(devId);

    // Verificar se o dev já faz parte do projeto. Caso sim,
    // não adiciona-lo novamente. Voltar pro usuario uma mensagem.

    const isDevInProject = await this.isDevInProject(projectId, devId);

    if (isDevInProject) {
      throw new ApiError("Dev already in this project", 409);
    }

    return await prisma.project.update({
      where: { id: projectId },
      data: { devs: { connect: { id: devId } } },
    });
  };
}
