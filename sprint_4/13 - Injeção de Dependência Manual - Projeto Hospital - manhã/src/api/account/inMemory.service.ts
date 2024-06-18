import { AccountNotFoundError, EmailAlreadyUsedError } from "./errors";
import {
  Account,
  AccountCreate,
  AccountUpdate,
  AccountWithoutPassword,
  IAccountService,
} from "./interfaces";
import { accountWithoutPasswordSchema } from "./schemas";
import { hashPassword } from "./utils";

const accountsDB: Account[] = [];

function generateNextId() {
  const lastAccount: Account | undefined = accountsDB
    .sort((a, b) => a.id - b.id)
    .at(-1);

  if (!lastAccount) {
    return 1;
  }

  return lastAccount.id + 1;
}

export class InMemoryAccountService implements IAccountService {
  public findByEmail = async (email: string): Promise<Account | null> => {
    console.log("InMemoryAccountService.findByEmail executado!");

    const account = accountsDB.find((account) => account.email === email);

    // if (!account) {
    //   return null;
    // }

    return account ? account : null;
  };

  public create = async (
    payload: AccountCreate
  ): Promise<AccountWithoutPassword> => {
    console.log("InMemoryAccountService.create executado!");
    const hasDuplicatedEmail = await this.findByEmail(payload.email);

    if (hasDuplicatedEmail) {
      throw new EmailAlreadyUsedError();
    }

    payload.password = await hashPassword(payload.password);

    const newAccount = {
      id: generateNextId(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    accountsDB.push(newAccount);

    return accountWithoutPasswordSchema.parse(newAccount);
  };

  public findAll = async (): Promise<AccountWithoutPassword[]> => {
    console.log("InMemoryAccountService.findAll executado!");
    return accountWithoutPasswordSchema.array().parse(accountsDB);
  };

  public findById = async (id: number): Promise<AccountWithoutPassword> => {
    console.log("InMemoryAccountService.findById executado!");
    const account = accountsDB.find((account) => account.id === id);

    if (!account) {
      throw new AccountNotFoundError();
    }

    return accountWithoutPasswordSchema.parse(account);
  };

  public partialUpdate = async (
    id: number,
    payload: AccountUpdate
  ): Promise<AccountWithoutPassword> => {
    console.log("InMemoryAccountService.partialUpdate executado!");
    const account = accountsDB.find((account) => account.id === id);

    if (!account) {
      throw new AccountNotFoundError();
    }

    if (payload.email) {
      const hasDuplicatedEmail = await this.findByEmail(payload.email);

      if (hasDuplicatedEmail) {
        throw new EmailAlreadyUsedError();
      }
    }

    if (payload.password) {
      payload.password = await hashPassword(payload.password);
    }

    const updatedAccount = {
      ...account,
      ...payload,
      updatedAt: new Date(),
    };

    const accountIndex = accountsDB.findIndex((account) => account.id === id);

    accountsDB.splice(accountIndex, 1, updatedAccount);

    return accountWithoutPasswordSchema.parse(updatedAccount);
  };

  public delete = async (id: number) => {
    // algo
  };
}
