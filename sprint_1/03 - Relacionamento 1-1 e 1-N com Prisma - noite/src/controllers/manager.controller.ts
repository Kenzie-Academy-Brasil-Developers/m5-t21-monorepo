import { Request, Response } from "express";
import { ManagerService } from "../services";
import { managerSchema, managerCreateSchema } from "../schemas";
import { ZodError } from "zod";

export class ManagerController {
  public create = async (req: Request, res: Response) => {
    try {
      req.body = managerCreateSchema.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }

      return res.status(500).json({ error: "internal server error" });
    }

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
