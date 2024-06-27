import { prisma } from "../../configs/prisma.config";
import { ApiError } from "../@shared/errors";

// is / has -> isActivated / hasDuplicatedEmail

export class MemberService {
  public create = async (payload: any) => {
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
}
