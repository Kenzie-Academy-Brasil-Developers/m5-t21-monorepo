import { Request } from "express";

export type PaginatedResponse<T> = {
  count: number;
  previousPage: string | null;
  nextPage: string | null;
  data: T[];
};

export function getPaginatedResponse<T>(
  count: number,
  page: number,
  perPage: number,
  data: T[],
  req: Request
): PaginatedResponse<T> {
  // http ://  localhost:3000  /api/books
  const baseUrl = `${req.protocol}://${req.headers.host}${req.baseUrl}`;
  // page = 50 e perPage = 10
  // 50 * 10 < 500 ?
  // page 49 e perPage = 10
  // 49 * 10 < 500 ? SIM -> previousPage = page - 1 (48) / nextPage = page + 1
  const previousPage =
    page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null;
  const nextPage =
    page * perPage < count
      ? `${baseUrl}?page=${page + 1}&perPage=${perPage}`
      : null;

  return {
    count,
    previousPage,
    nextPage,
    data,
  };
}

/*
  PAGINA 1 (primeira página)
{
  "count": 500,
  "previousPage": null,
  "nextPage": "http://localhost:3000/api/books?page=3&perPage=10",
  "data": [
    // Lista de livros aqui
  ]
}

  ULTIMA PAGINA (PÁGINA 50 NO CASO ABAIXO)
{
  "count": 500,
  "previousPage": http://localhost:3000/api/books?page=49&perPage=10,
  "nextPage": null,
  "data": [
    // Lista de livros aqui
  ]
}
*/
