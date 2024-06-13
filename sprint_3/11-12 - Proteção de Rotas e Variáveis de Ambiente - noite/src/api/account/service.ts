import { prisma } from "../../../prisma/prisma.client";
import { AccountCreate, AccountUpdate } from "./interfaces";
import { hashPassword } from "./utils";
import { accountWithoutPasswordSchema } from "./schemas";
import { ApiError } from "../@shared/errors";
import { AccountNotFoundError, EmailAlreadyUsedError } from "./errors";

export class AccountService {
  public findByEmail = async (email: string) => {
    return await prisma.account.findUnique({ where: { email } });
  };

  public create = async (payload: AccountCreate) => {
    const hasDuplicatedEmail = await this.findByEmail(payload.email);

    if (hasDuplicatedEmail) {
      // 409 - CONFLICT
      throw new EmailAlreadyUsedError();
    }

    payload.password = await hashPassword(payload.password);
    const account = await prisma.account.create({
      data: payload,
    });

    return accountWithoutPasswordSchema.parse(account);
  };

  public findAll = async () => {
    const accounts = await prisma.account.findMany();

    return accountWithoutPasswordSchema.array().parse(accounts);
  };

  public findById = async (id: number) => {
    const account = await prisma.account.findUnique({ where: { id } });

    if (!account) {
      throw new AccountNotFoundError();
    }

    return account;
  };

  public partialUpdate = async (id: number, payload: AccountUpdate) => {
    // 1. A conta existe?
    await this.findById(id);
    /*
      - E se o usuario passar um email para ser atualizado que já existe no banco?
      - E se o usuario modificar a senha?
    */

    if (payload.email) {
      const hasDuplicatedEmail = await this.findByEmail(payload.email);

      if (hasDuplicatedEmail) {
        // 409 - CONFLICT
        throw new EmailAlreadyUsedError();
      }
    }

    if (payload.password) {
      payload.password = await hashPassword(payload.password);
    }

    const updatedAccount = await prisma.account.update({
      data: payload,
      where: { id },
    });

    return accountWithoutPasswordSchema.parse(updatedAccount);
  };
}
