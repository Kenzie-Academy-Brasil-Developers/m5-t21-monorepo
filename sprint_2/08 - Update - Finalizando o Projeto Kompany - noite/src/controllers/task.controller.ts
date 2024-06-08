import { Request, Response } from "express";
import { TaskService } from "../services";
import { taskCreateSchema } from "../schemas";
import { ZodError } from "zod";

export class TaskController {
  private taskService = new TaskService();

  public create = async (req: Request, res: Response) => {
    const task = await this.taskService.create(req.body);

    return res.status(201).json(task);
  };

  public findAll = async (req: Request, res: Response) => {
    const tasks = await this.taskService.findAll();

    return res.json(tasks);
  };

  public findOne = async (req: Request, res: Response) => {
    const task = await this.taskService.findOne(Number(req.params.taskId));

    return res.json(task);
  };
}
