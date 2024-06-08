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
    const name = req.query.name ? String(req.query.name) : undefined;

    console.log("###\n\n", name, "\n\n\n###");
    console.log("###\n\n", typeof name, "\n\n\n###");

    const projects = await this.projectService.findAll(name);

    return res.json(projects);
  };

  public findOne = async (req: Request, res: Response) => {
    const project = await this.projectService.findOne(
      Number(req.params.projectId)
    );

    return res.json(project);
  };

  public addDev = async (req: Request, res: Response) => {
    const project = await this.projectService.addDev(
      Number(req.params.projectId),
      req.body.devId
    );

    return res.status(201).json(project);
  };
}
