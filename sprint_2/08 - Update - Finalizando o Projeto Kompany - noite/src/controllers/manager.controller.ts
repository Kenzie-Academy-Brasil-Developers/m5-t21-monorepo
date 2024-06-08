import { Request, Response } from "express";
import { ManagerService } from "../services";
import { managerCreateSchema } from "../schemas";
import { ZodError } from "zod";

export class ManagerController {
  private managerService = new ManagerService();

  public create = async (req: Request, res: Response) => {
    const manager = await this.managerService.create(req.body);

    return res.status(201).json(manager);
  };

  public findAll = async (req: Request, res: Response) => {
    const managers = await this.managerService.findAll();

    return res.json(managers);
  };

  public findOne = async (req: Request, res: Response) => {
    const manager = await this.managerService.findOne(
      Number(req.params.managerId)
    );

    return res.json(manager);
  };

  public update = async (req: Request, res: Response) => {
    const manager = await this.managerService.update(
      Number(req.params.managerId),
      req.body
    );

    return res.json(manager);
  };

  public delete = async (req: Request, res: Response) => {
    await this.managerService.delete(Number(req.params.managerId));

    return res.status(204).json();
  };
}
