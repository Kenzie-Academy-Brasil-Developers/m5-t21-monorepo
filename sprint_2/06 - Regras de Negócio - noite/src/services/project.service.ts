import { Project, ProjectCreate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";
import { projectDetailSchema } from "../schemas";
import { ApiError } from "../errors";
import { DevService } from "./dev.service";

export class ProjectService {
  private devService = new DevService();

  public isDevInProject = async (projectId: number, devId: number) => {
    // 1. O projeto com projectId passado existe?
    const foundProject = await this.findOne(projectId);

    // 2. O dev com ownerId passado existe?
    await this.devService.findOne(devId);

    const isDevInProject = foundProject.devs.find((dev) => dev.id === devId);

    return Boolean(isDevInProject);
  };

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
      include: { manager: true, devs: true },
    });

    if (!foundProject) {
      throw new ApiError("Project not found", 404);
    }

    return projectDetailSchema.parse(foundProject);
  };

  public addDev = async (projectId: number, devId: number) => {
    // // 1. O projeto com projectId passado existe?
    // const foundProject = await prisma.project.findUnique({
    //   where: { id: projectId },
    // });

    // if (!foundProject) {
    //   throw new ApiError("Project not found", 404);
    // }

    // // 2. O dev com ownerId passado existe?
    // const foundDev = await prisma.dev.findUnique({
    //   where: { id: devId },
    // });

    // if (!foundDev) {
    //   throw new ApiError("Dev not found", 404);
    // }

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
