import { Request, Response } from "express";
import { DevService } from "../services";

export class DevController {
  private devService = new DevService();

  public create = async (req: Request, res: Response) => {
    const dev = await this.devService.create(req.body);

    return res.status(201).json(dev);
  };

  public findAll = async (req: Request, res: Response) => {
    const devs = await this.devService.findAll();

    return res.json(devs);
  };

  public findOne = async (req: Request, res: Response) => {
    const foundDev = await this.devService.findOne(Number(req.params.id));

    return res.json(foundDev);
  };
}
