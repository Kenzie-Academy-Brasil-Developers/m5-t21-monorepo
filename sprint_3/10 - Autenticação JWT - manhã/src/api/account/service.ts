import { prisma } from "../../../prisma/prisma.client";
import { AccountCreate } from "./interfaces";
import { hashPassword } from "./utils";
import { accountWithoutPasswordSchema } from "./schemas";

export class AccountService {
  public create = async (payload: AccountCreate) => {
    console.log("#############");
    console.log(payload);
    console.log("#############");

    payload.password = await hashPassword(payload.password);
    const newAccount = await prisma.account.create({ data: payload });

    return accountWithoutPasswordSchema.parse(newAccount);
  };

  public findAll = async () => {
    const accounts = await prisma.account.findMany();

    return accountWithoutPasswordSchema.array().parse(accounts);
  };
}
