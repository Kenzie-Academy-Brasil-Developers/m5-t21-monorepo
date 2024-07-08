import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { MemberService } from "./service";
import { getPaginatedResponse } from "../@shared/pagination/paginated-response";

@injectable()
export class MemberController {
  constructor(private memberService: MemberService) {}

  public create = async (req: Request, res: Response) => {
    const member = await this.memberService.create(req.body);

    return res.status(201).json(member);
  };

  public list = async (req: Request, res: Response) => {
    const { page, perPage } = res.locals;

    const members = await this.memberService.list(page, perPage);
    const memberCount = await this.memberService.count();

    const paginatedResponse = getPaginatedResponse(
      memberCount,
      page,
      perPage,
      members,
      req
    );

    return res.status(200).json(paginatedResponse);
  };
}
