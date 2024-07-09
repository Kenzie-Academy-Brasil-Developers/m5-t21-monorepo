import { prisma } from "../../configs/prisma.config";
import { ApiError } from "../@shared/errors";
import { MAX_PER_PAGE_NUMBER } from "../@shared/pagination/pagination.middleware";
import { IMemberService, Member, MemberCreate } from "./interfaces";

export class MemberService implements IMemberService {
  public count = async (): Promise<number> => {
    return await prisma.member.count();
  };

  public create = async (payload: MemberCreate): Promise<Member> => {
    const hasDuplicatedCpf =
      (await prisma.member.count({
        where: { cpf: payload.cpf },
      })) !== 0;

    if (hasDuplicatedCpf) {
      throw new ApiError("Cpf already used", 409);
    }

    const member = await prisma.member.create({ data: payload });

    return member;
  };

  public list = async (
    page: number = 1,
    perPage: number = MAX_PER_PAGE_NUMBER
  ): Promise<Member[]> => {
    const members = await prisma.member.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return members;
  };

  public findById = async (id: number): Promise<Member> => {
    const member = await prisma.member.findUnique({ where: { id } });

    if (!member) {
      throw new ApiError("Member not found", 404);
    }

    return member;
  };
}
