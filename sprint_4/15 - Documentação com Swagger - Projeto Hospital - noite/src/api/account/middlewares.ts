import { NextFunction, Request, Response } from "express";
import { ApiError } from "../@shared/errors";
import { UserRole } from "@prisma/client";

export function isAccountOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Qual conta está tentando ser atualizada? req.params.id
  const { id } = req.params;
  // 2. Quem está tentando atualizar, é dono da conta? res.locals.accountId
  const { sub } = res.locals.jwtPayload;

  if (sub !== id) {
    // 403 - Forbidden
    throw new ApiError("You dont have permission to perform this action", 403);
  }

  return next();
}

export function isNurse(req: Request, res: Response, next: NextFunction) {
  const { role, sub } = res.locals.jwtPayload;

  if (role !== UserRole.NURSE) {
    throw new ApiError("You dont have permission to perform this action", 403);
  }

  req.body.createdById = Number(sub);

  return next();
}
