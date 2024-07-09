import { prisma } from "../../configs/prisma.config";
import { BookCreate } from "./interfaces";
import { fakerPT_BR as faker } from "@faker-js/faker";

export class BookFactory {
  static build = (data: Partial<BookCreate> = {}) => {
    return {
      title: `Title Test - ${faker.lorem.sentence({ min: 1, max: 4 })}`,
      author: faker.person.fullName(),
      isbn: faker.commerce.isbn({ separator: "", variant: 13 }),
      publicationYear: faker.date.past({ years: 50 }).getFullYear(),
      available: faker.datatype.boolean(),
      ...data,
    };
  };

  static buildMany = (count: number, data: Partial<BookCreate> = {}) => {
    return Array.from({ length: count }, () => this.build(data));
  };

  static create = async (data: Partial<BookCreate> = {}) => {
    const book = this.build(data);

    return await prisma.book.create({ data: book });
  };

  static createMany = async (count: number, data: Partial<BookCreate> = {}) => {
    const books = this.buildMany(count, data);

    return await prisma.book.createManyAndReturn({ data: books });
  };
}
