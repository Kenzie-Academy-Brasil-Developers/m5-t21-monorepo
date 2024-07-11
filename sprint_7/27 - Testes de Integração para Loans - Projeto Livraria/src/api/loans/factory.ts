import { LoanStatus } from "@prisma/client";
import { prisma } from "../../configs/prisma.config";
import { LoanCreate } from "./interfaces";
import { fakerPT_BR as faker } from "@faker-js/faker";

export class LoanFactory {
  static build = (data: Partial<LoanCreate> = {}) => {
    return {
      loanDate: faker.date.recent({ days: 3 }),
      returnDate: faker.date.soon({ days: 3 }),
      status: faker.helpers.enumValue(LoanStatus),
      amount: faker.number.int({ min: 1, max: 32000 }),
      bookId: faker.number.int({ min: 1, max: 32000 }),
      memberId: faker.number.int({ min: 1, max: 32000 }),
      ...data,
    };
  };

  // Criar dados unicos: https://next.fakerjs.dev/guide/unique
  static buildMany = (count: number, data: Partial<LoanCreate> = {}) => {
    return Array.from({ length: count }, () => this.build());
  };

  static create = async (data: Partial<LoanCreate> = {}) => {
    const loan = this.build(data);

    return await prisma.loan.create({ data: loan });
  };

  static createMany = async (count: number, data: Partial<LoanCreate> = {}) => {
    const loans = this.buildMany(count, data);

    return await prisma.loan.createManyAndReturn({ data: loans });
  };
}
