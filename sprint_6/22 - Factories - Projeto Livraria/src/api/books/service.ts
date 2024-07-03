import { prisma } from "../../configs/prisma.config";
import { ApiError } from "../@shared/errors";
import { Book, BookCreate, IBookService } from "./interfaces";

export class BookService implements IBookService {
  public create = async (payload: BookCreate): Promise<Book> => {
    const book = await prisma.book.create({ data: payload });

    return book;
  };

  public list = async (): Promise<Book[]> => {
    const books = await prisma.book.findMany();

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
