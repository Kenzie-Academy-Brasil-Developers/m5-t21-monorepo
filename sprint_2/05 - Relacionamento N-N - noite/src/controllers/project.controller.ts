import { Request, Response } from "express";
import { ProjectService } from "../services";
import { projectCreateSchema } from "../schemas";
import { ZodError } from "zod";

export class ProjectController {
  private projectService = new ProjectService();

  public create = async (req: Request, res: Response) => {
    const project = await this.projectService.create(req.body);

    return res.status(201).json(project);
  };

  public findAll = async (req: Request, res: Response) => {
    const projects = await this.projectService.findAll();

    return res.json(projects);
  };

  public findOne = async (req: Request, res: Response) => {
    const project = await this.projectService.findOne(
      Number(req.params.projectId)
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json(project);
  };
}
