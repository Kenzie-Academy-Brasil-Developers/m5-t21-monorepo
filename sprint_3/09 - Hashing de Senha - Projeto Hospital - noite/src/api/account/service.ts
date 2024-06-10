import { prisma } from "../../../prisma/prisma.client";
import { AccountCreate } from "./interfaces";
import { hashPassword } from "./utils";
import { accountWithoutPasswordSchema } from "./schemas";
// import * as bcrypt from "bcryptjs";

export class AccountService {
  public create = async (payload: AccountCreate) => {
    // V1 (ERRADO) - RETORNANDO A SENHA E GUARDANDO ELA PURA NO BANCO
    // const account = await prisma.account.create({ data: payload });

    // V2 - HASHEANDO A SENHA MAS VOLTANDO PASSWORD NA REQUEST
    // payload.password = await bcrypt.hash(payload.password, 10);
    // const account = await prisma.account.create({ data: payload });

    // V2.1 (LÓGICA EXTRAÍDA PARA FUNÇÃO) - HASHEANDO A SENHA MAS VOLTANDO PASSWORD NA REQUEST
    payload.password = await hashPassword(payload.password);
    // INSERT / SELECT * FROM "accounts" WHERE "accounts".id == 1;
    const account = await prisma.account.create({
      data: payload,
    });

    // return account;
    return accountWithoutPasswordSchema.parse(account);
  };
}
