import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors/api.errors";
import { Project, ProjectCreate } from "../interfaces";
import { projectDetailSchema } from "../schemas";
import { DevService } from "./dev.service";
import { ManagerService } from "./manager.service";

export class ProjectService {
  private devService = new DevService();

  public isDevInProject = async (projectId: number, devId: number) => {
    const [foundProject, _] = await Promise.all([
      this.findOne(projectId),
      this.devService.findOne(devId),
    ]);

    // const foundProject = await this.findOne(projectId);
    // await this.devService.findOne(devId);

    const isDevInProject = foundProject.devs.find((dev) => dev.id === devId);

    return Boolean(isDevInProject);
  };

  public create = async (payload: ProjectCreate) => {
    const managerService = new ManagerService();
    await managerService.findOne(payload.managerId);

    const project = await prisma.project.create({ data: payload });

    return project;
  };

  public findAll = async (name?: string) => {
    // banco -> banco->
    // SQL -> LIKE % -> M m -> m m -> ILIKE case insensitive - M = m
    return await prisma.project.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
    });
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
