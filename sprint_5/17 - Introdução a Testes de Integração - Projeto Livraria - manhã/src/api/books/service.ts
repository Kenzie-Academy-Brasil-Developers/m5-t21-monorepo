import { prisma } from "../../configs/prisma.config";
import { BookCreate, IBookService } from "./interfaces";

export class BookService implements IBookService {
  public create = async (payload: BookCreate) => {
    const book = await prisma.book.create({ data: payload });

    return book;
  };

  public list = async () => {
    const books = await prisma.book.findMany();

    return books;
  };
}
