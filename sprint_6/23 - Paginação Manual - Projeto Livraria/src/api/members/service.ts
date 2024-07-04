import { prisma } from "../../configs/prisma.config";
import { ApiError } from "../@shared/errors";
import { IMemberService, Member, MemberCreate } from "./interfaces";

export class MemberService implements IMemberService {
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

  public list = async (): Promise<Member[]> => {
    const members = await prisma.member.findMany();

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
