import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors/api.errors";
import { Task, TaskCreate } from "../interfaces";
import { DevService } from "./dev.service";
import { ProjectService } from "./project.service";

export class TaskService {
  private projectService = new ProjectService();
  private devService = new DevService();

  public create = async (payload: TaskCreate) => {
    if (payload.devId) {
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
    }

    const task = await prisma.task.create({ data: payload });

    return task;
  };

  public findAll = async (): Promise<Task[]> => {
    return await prisma.task.findMany();
  };

  public findOne = async (taskId: number): Promise<Task | null> => {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new ApiError("Task not found", 404);
    }

    return task;
  };
}
