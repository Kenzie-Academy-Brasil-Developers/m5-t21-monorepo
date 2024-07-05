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

  /*
  {
    "count": 500,
    "previousPage": "http://localhost:3000/api/books?page=1&perPage=10",
    "nextPage": "http://localhost:3000/api/books?page=3&perPage=10",
    "data": [
      // Lista de livros aqui
    ]
}
*/
  public list = async (req: Request, res: Response) => {
    const { page, perPage } = res.locals;

    const books = await this.bookService.list(page, perPage);
    const bookCount = await this.bookService.count();

    const paginatedResponse = getPaginatedResponse<Book>(
      bookCount,
      page,
      perPage,
      books,
      req
    );

    return res.status(200).json(paginatedResponse);
  };
}
