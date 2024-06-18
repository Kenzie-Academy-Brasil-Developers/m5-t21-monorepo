import { Request, Response } from "express";
import { AccountService } from "./service";
import { IAccountService } from "./interfaces";

export class AccountController {
  // private accountService = new AccountService();

  constructor(private accountService: IAccountService) {}

  public create = async (req: Request, res: Response) => {
    const account = await this.accountService.create(req.body);

    return res.status(201).json(account);
  };

  public findAll = async (req: Request, res: Response) => {
    const accounts = await this.accountService.findAll();

    return res.status(200).json(accounts);
  };

  public findById = async (req: Request, res: Response) => {
    const account = await this.accountService.findById(Number(req.params.id));

    return res.status(200).json(account);
  };

  public partialUpdate = async (req: Request, res: Response) => {
    const accounts = await this.accountService.partialUpdate(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(accounts);
  };

  public delete = async (req: Request, res: Response) => {
    await this.accountService.delete(Number(req.params.id));
  };
}
