import { prisma } from "../../../prisma/prisma.client";
import { AccountCreate } from "./interfaces";
import { hashPassword } from "./utils";
import { accountWithoutPasswordSchema } from "./schemas";

export class AccountService {
  public create = async (payload: AccountCreate) => {
    payload.password = await hashPassword(payload.password);
    const account = await prisma.account.create({
      data: payload,
    });

    return accountWithoutPasswordSchema.parse(account);
  };
}
