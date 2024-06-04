import { Request, Response } from "express";
import { ManagerService, ExemploService } from "../services";

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
    const foundManager = await this.managerService.findOne(
      Number(req.params.id)
    );

    return res.json(foundManager);
  };
}
