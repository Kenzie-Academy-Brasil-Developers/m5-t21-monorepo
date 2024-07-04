import { prisma } from "../../configs/prisma.config";
import { ApiError } from "../@shared/errors";
import { Book, BookCreate, IBookService } from "./interfaces";

export class BookService implements IBookService {
  public create = async (payload: BookCreate): Promise<Book> => {
    const book = await prisma.book.create({ data: payload });

    return book;
  };

  public list = async (page: number, perPage: number): Promise<Book[]> => {
    /*
    prisma - sql - queryParam
    skip - offset do SQL - (page - 1) * perPage
    take - limit do SQL - perPage
    */

    const books = await prisma.book.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return books;
  };

  public findById = async (id: number): Promise<Book> => {
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new ApiError("Book not found", 404);
    }

    return book;
  };
}
