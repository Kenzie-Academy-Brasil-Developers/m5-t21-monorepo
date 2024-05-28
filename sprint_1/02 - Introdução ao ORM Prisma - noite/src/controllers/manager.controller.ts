import { Request, Response } from "express";
import { ManagerService } from "../services";

export class ManagerController {
  public create = async (req: Request, res: Response) => {
    const managerService = new ManagerService();
    const manager = await managerService.create(req.body);

    return res.status(201).json(manager);
  };

  public findAll = async (req: Request, res: Response) => {
    const managerService = new ManagerService();
    const managers = await managerService.findAll();

    return res.json(managers);
  };

  public findOne = async (req: Request, res: Response) => {
    const managerService = new ManagerService();
    const manager = await managerService.findOne(Number(req.params.managerId));

    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }

    return res.json(manager);
  };
}
