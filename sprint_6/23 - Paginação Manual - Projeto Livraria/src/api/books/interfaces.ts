import { z } from "zod";
import { bookCreateSchema, bookSchema } from "./schemas";

export type Book = z.infer<typeof bookSchema>;
export type BookCreate = z.infer<typeof bookCreateSchema>;

export interface IBookService {
  create: (payload: BookCreate) => Promise<Book>;
  list: (page: number, perPage: number) => Promise<Book[]>;
  findById: (id: number) => Promise<Book>;
}
