import { Request, Response } from "express";
import { BookService } from "./service";
import { injectable } from "tsyringe";
import { prisma } from "../../configs/prisma.config";
import { getPaginatedResponse } from "../@shared/pagination/paginated-response";
import { Book } from "./interfaces";

@injectable()
export class BookController {
  constructor(private bookService: BookService) {}

  public create = async (req: Request, res: Response) => {
    const book = await this.bookService.create(req.body);

    return res.status(201).json(book);
  };

  public list = async (req: Request, res: Response) => {
    const { page, perPage } = res.locals;

    const books = await this.bookService.list(page, perPage);
    const bookCount = await this.bookService.count();

    const paginatedResponse = getPaginatedResponse(
      bookCount,
      page,
      perPage,
      books,
      req
    );

    return res.status(200).json(paginatedResponse);
    // const books = await prisma.book.findMany();
    // return res.status(200).json(books);
  };
}
