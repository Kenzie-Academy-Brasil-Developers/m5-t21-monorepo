import { Request, Response } from "express";
import { AccountService } from "./service";
import { IAccountService } from "./interfaces";

export class AccountController {
  // private accountService = new AccountService();

  // private accountService: IAccountService;
  // constructor(accountService: IAccountService) {
  //   this.accountService = accountService;
  // }
  constructor(private accountService: IAccountService) {}

  public create = async (req: Request, res: Response) => {
    const account = await this.accountService.create(req.body);

    return res.status(201).json(account);
  };

  public findAll = async (req: Request, res: Response) => {
    const accounts = await this.accountService.findAll();

    return res.json(accounts);
  };

  public partialUpdate = async (req: Request, res: Response) => {
    const account = await this.accountService.partialUpdate(
      Number(req.params.id),
      req.body
    );

    return res.json(account);
  };
}
