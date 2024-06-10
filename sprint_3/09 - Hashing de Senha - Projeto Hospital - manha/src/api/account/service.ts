import { prisma } from "../../../prisma/prisma.client";
import { AccountCreate } from "./interfaces";
import * as bcrypt from "bcryptjs";
import { hashPassword } from "./utils";
import { accountWithoutPasswordSchema } from "./schemas";

export class AccountService {
  public create = async (payload: AccountCreate) => {
    // V1 (ERRADO) - RETORNANDO A SENHA E GUARDANDO ELA PURA NO BANCO
    // const newAccount = await prisma.account.create({ data: payload });

    // V2 - HASHEANDO A SENHA MAS VOLTANDO PASSWORD NA REQUEST
    // payload.password = await bcrypt.hash(payload.password, 10);
    // const newAccount = await prisma.account.create({ data: payload });

    // V2.1 - HASHEANDO A SENHA MAS VOLTANDO PASSWORD NA REQUEST (em outro arquivo)
    // payload.password = await hashPassword(payload.password);
    // const newAccount = await prisma.account.create({ data: payload });

    // V2.1 - HASHEANDO A SENHA MAS VOLTANDO PASSWORD NA REQUEST (em outro arquivo)
    payload.password = await hashPassword(payload.password);
    const newAccount = await prisma.account.create({ data: payload });

    // V3 - HASHEANDO A SENHA E NÃO VOLTANDO PASSWORD NA REQUEST (em outro arquivo)
    return accountWithoutPasswordSchema.parse(newAccount);
  };

  public findAll = async () => {
    const accounts = await prisma.account.findMany();

    return accountWithoutPasswordSchema.array().parse(accounts);
  };
}
