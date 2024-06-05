import { Request, Response } from "express";
import { ProjectService } from "../services";

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
    const foundProject = await this.projectService.findOne(
      Number(req.params.projectId)
    );

    return res.json(foundProject);
  };

  public addDev = async (req: Request, res: Response) => {
    const project = await this.projectService.addDev(
      Number(req.params.projectId),
      req.body.devId
    );

    return res.status(201).json(project);
  };
}
