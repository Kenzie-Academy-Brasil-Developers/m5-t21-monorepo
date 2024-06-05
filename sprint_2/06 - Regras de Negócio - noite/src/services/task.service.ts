import { Task, TaskCreate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors";
import { ProjectService } from "./project.service";

export class TaskService {
  private projectService = new ProjectService();

  public create = async (payload: TaskCreate) => {
    // // 1. O projeto com projectId passado existe?
    // const foundProject = await prisma.project.findUnique({
    //   where: { id: payload.projectId },
    // });

    // if (!foundProject) {
    //   throw new ApiError("Project not found", 404);
    // }

    // // 2. O dev com ownerId passado existe?
    // const foundDev = await prisma.dev.findUnique({
    //   where: { id: payload.devId },
    // });

    // if (!foundDev) {
    //   throw new ApiError("Dev not found", 404);
    // }
    // 3. Dev faz parte do projeto?
    // Se não, retornar uma mensagem para o usuario
    const isDevInProject = await this.projectService.isDevInProject(
      payload.projectId,
      payload.devId
    );

    if (!isDevInProject) {
      throw new ApiError(
        "Dev must be in project to be assigned to a task",
        422
      );
    }

    // Se sim, adicionar task ao dev
    const newTask = await prisma.task.create({ data: payload });

    return newTask;
  };

  public findAll = async () => {
    return await prisma.task.findMany();
  };

  public findOne = async (taskId: number) => {
    const foundTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!foundTask) {
      throw new ApiError("Task not found", 404);
    }

    return foundTask;
  };
}
