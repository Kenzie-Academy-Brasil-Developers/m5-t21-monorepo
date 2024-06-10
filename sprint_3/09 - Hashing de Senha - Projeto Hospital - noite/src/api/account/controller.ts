import { Request, Response } from "express";
import { AccountService } from "./service";

export class AccountController {
  private accountService = new AccountService();

  public create = async (req: Request, res: Response) => {
    const account = await this.accountService.create(req.body);

    return res.status(201).json(account);
  };
}
