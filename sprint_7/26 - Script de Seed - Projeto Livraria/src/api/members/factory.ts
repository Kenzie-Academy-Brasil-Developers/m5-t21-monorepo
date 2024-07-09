import { prisma } from "../../configs/prisma.config";
import { MemberCreate } from "./interfaces";
import { fakerPT_BR as faker } from "@faker-js/faker";

export class MemberFactory {
  static build = (data: Partial<MemberCreate> = {}) => {
    return {
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      phoneNumber: faker.phone.number(),
      ...data,
    };
  };

  // Criar dados unicos: https://next.fakerjs.dev/guide/unique
  static buildMany = (count: number, data: Partial<MemberCreate> = {}) => {
    return Array.from({ length: count }, () => this.build());
  };

  static create = async (data: Partial<MemberCreate> = {}) => {
    const member = this.build(data);

    return await prisma.member.create({ data: member });
  };

  static createMany = async (
    count: number,
    data: Partial<MemberCreate> = {}
  ) => {
    const members = this.buildMany(count, data);

    return await prisma.member.createManyAndReturn({ data: members });
  };
}
