import { NextFunction, Request, Response } from "express";
import { ApiError } from "../@shared/errors";

export function isAccountOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Qual conta está tentando ser atualizada? req.params.id
  const { id } = req.params;
  // 2. Quem está tentando atualizar, é dono da conta? res.locals.accountId
  const { accountId } = res.locals;

  if (accountId !== id) {
    // 403 - Forbidden
    throw new ApiError("You dont have permission to perform this action", 403);
  }

  return next();
}
