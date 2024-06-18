import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../@shared/errors";

export function isAccountOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //1. ID DA CONTA A SER ATUALIZADA (VEM DO URL PARAM) /accounts/:id
  const accountIdParam = req.params.id;

  // 2. Comparar com o id do token do usuário que está tentando realizar
  // a operação PATCH
  const { accountId } = res.locals;

  // 403 - FORBIDDEN
  if (accountIdParam !== accountId) {
    throw new ForbiddenError();
    // throw new ApiError("You dont have permission to perform this action", 403);
  }

  return next();
}
