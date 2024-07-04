import { NextFunction, Request, Response } from "express";

export const MAX_PER_PAGE_NUMBER = 10;

export function validatePaginationQuery(
  queryPage?: number,
  queryPerPage?: number
) {
  const page = queryPage && queryPage > 1 ? queryPage : 1;
  // Operação lógica AND (&&) -> Basta 1 condicional ser falsa para invalidar todo o conjunto
  const perPage =
    queryPerPage && queryPerPage > 0 && queryPerPage < MAX_PER_PAGE_NUMBER
      ? queryPerPage
      : MAX_PER_PAGE_NUMBER;

  return { page, perPage };
}

// TODO: Implementar testes unitarios sobre o middleware
export function handlePaginationParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /*
    Body -> req.body
    Route Param (obrigatorio) -> req.params
    Query Params (opcional) -> req.query

    /api/books?page=1&perPage=10
  */
  const queryPage = Number(req.query.page);
  const queryPerPage = Number(req.query.perPage);

  // console.log("queryPage", queryPage);
  // console.log("queryPerPage", queryPerPage);
  console.log(req);
  const { page, perPage } = validatePaginationQuery(queryPage, queryPerPage);

  // console.log("");

  // console.log("page - middleware", page);
  // console.log("perPage - middleware", perPage);

  res.locals = { ...res.locals, page, perPage };

  return next();
}
