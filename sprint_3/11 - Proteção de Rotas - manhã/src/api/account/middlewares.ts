import { NextFunction, Request, Response } from "express";
import { ApiError } from "../@shared/errors";

export function isAccountOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //1. ID DA CONTA A SER ATUALIZADA (VEM DO URL PARAM) /accounts/:id
  const accountId = req.params.id;

  // 2. Comparar com o id do token do usuário que está tentando realizar
  // a operação PATCH
  const decodedJwtPayload = res.locals.decodedJwtPayload;

  console.log("################");
  console.log("URL PARAM ID:", accountId);
  console.log("TYPEOF URL PARAM ID:", typeof accountId);
  console.log("PAYLOAD:", decodedJwtPayload);
  console.log("################");

  // 403 - FORBIDDEN
  if (accountId !== decodedJwtPayload.sub) {
    throw new ApiError("You dont have permission to perform this action", 403);
  }

  return next();
}
