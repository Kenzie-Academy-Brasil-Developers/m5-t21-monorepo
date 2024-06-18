import { NextFunction, Request, Response } from "express";
import { ApiError } from "../@shared/errors";
import { verifyToken } from "../../configs";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  // 401 - Unauthorized
  if (!authorization) {
    throw new ApiError("Missing bearer token", 401);
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw new ApiError("Missing token Bearer prefix", 401);
  }

  const jwtPayload = verifyToken(token);

  console.log("##############");
  console.log(jwtPayload);
  console.log("##############");
  res.locals.accountId = jwtPayload.sub;

  return next();
}
