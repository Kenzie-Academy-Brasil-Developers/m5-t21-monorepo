import { Request, Response } from "express";
import { LoanService } from "./service";
import { injectable } from "tsyringe";

@injectable()
export class LoanController {
  constructor(private loanService: LoanService) {}

  public create = async (req: Request, res: Response) => {
    const loan = await this.loanService.create(req.body);

    return res.status(201).json(loan);
  };
}
