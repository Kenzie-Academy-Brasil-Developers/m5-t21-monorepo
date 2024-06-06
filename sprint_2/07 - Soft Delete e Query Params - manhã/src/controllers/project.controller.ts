import { Request, Response } from "express";
import { ProjectService } from "../services";

export class ProjectController {
  private projectService = new ProjectService();

  public create = async (req: Request, res: Response) => {
    const project = await this.projectService.create(req.body);

    return res.status(201).json(project);
  };

  public findAll = async (req: Request, res: Response) => {
    /*
    body -> req.body
    params -> req.params (route params) (:projectId)
    query -> req.query (query params) (?query_param1=valor_1&query_param2=valor_2)
    */
    const name = req.query.name ? String(req.query.name) : undefined;
    // const name = String(req.query.name);
    // console.log("\n\n\n###\n", name, "\n\n\n###");
    // console.log("\n\n\n###\n", typeof name, "\n\n\n###");

    const projects = await this.projectService.findAll(name);

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
