import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { MemberService } from "./service";

@injectable()
export class MemberController {
  constructor(private memberService: MemberService) {}

  public create = async (req: Request, res: Response) => {
    const member = await this.memberService.create(req.body);

    return res.status(201).json(member);
  };
}
