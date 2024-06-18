import { NextFunction, Request, Response, request, response } from "express";
import { ForbiddenError } from "../@shared/errors";

export function isAccountOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accountIdParam = req.params.id;

  // TODO: Ajustar lógica, agora no res.locals temos o payload inteiro do JWT
  const { accountId } = res.locals;

  if (accountIdParam !== accountId) {
    throw new ForbiddenError();
  }

  return next();
}

export function isNurse(req: Request, res: Response, next: NextFunction) {
  const { decodedToken } = res.locals;

  // console.log("###################");
  // console.log(decodedToken);
  // console.log("###################");

  // TODO: comparar com o enum diretamente
  if (decodedToken.role !== "NURSE") {
    throw new ForbiddenError();
  }

  req.body.createdById = Number(decodedToken.sub);

  return next();
}
