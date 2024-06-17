import { prisma } from "../../../prisma/prisma.client";
import { AccountCreate, AccountUpdate, IAccountService } from "./interfaces";
import { hashPassword } from "./utils";
import { accountWithoutPasswordSchema } from "./schemas";
import { AccountNotFoundError, EmailAlreadyUsedError } from "./errors";

export class AccountService implements IAccountService {
  public findByEmail = async (email: string) => {
    const account = prisma.account.findUnique({ where: { email } });

    return account;
  };

  public create = async (payload: AccountCreate) => {
    const hasDuplicatedEmail = await this.findByEmail(payload.email);

    if (hasDuplicatedEmail) {
      throw new EmailAlreadyUsedError();
    }

    payload.password = await hashPassword(payload.password);
    const newAccount = await prisma.account.create({ data: payload });

    return accountWithoutPasswordSchema.parse(newAccount);
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

    return accountWithoutPasswordSchema.parse(account);
  };

  public partialUpdate = async (id: number, payload: AccountUpdate) => {
    await this.findById(id);

    if (payload.email) {
      const hasDuplicatedEmail = await this.findByEmail(payload.email);

      if (hasDuplicatedEmail) {
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

  public delete = async (id: number) => {
    // algo
  };
}
