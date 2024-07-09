import { prisma } from "../../configs/prisma.config";
import { ApiError } from "../@shared/errors";
import { MAX_PER_PAGE_NUMBER } from "../@shared/pagination/pagination.middleware";
import { Book, BookCreate, IBookService } from "./interfaces";

let x: Array<Book>;
let z: Book[];

export class BookService implements IBookService {
  public count = async (): Promise<number> => {
    return await prisma.book.count();
  };

  public create = async (payload: BookCreate): Promise<Book> => {
    const book = await prisma.book.create({ data: payload });

    return book;
  };

  public list = async (
    page: number = 1,
    perPage: number = MAX_PER_PAGE_NUMBER
  ): Promise<Book[]> => {
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
