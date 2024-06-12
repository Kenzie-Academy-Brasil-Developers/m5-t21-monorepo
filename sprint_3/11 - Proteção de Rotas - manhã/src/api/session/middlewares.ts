import { NextFunction, Request, Response } from "express";
import { ApiError } from "../@shared/errors";
import jwt from "jsonwebtoken";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ApiError("Missing bearer token", 401);
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw new ApiError("Missing token Bearer prefix", 401);
  }

  const secret = process.env.JWT_SECRET as string;
  const decodedJwtPayload = jwt.verify(token, secret);

  // { fullName: 'Dr. Áuzio', iat: 1718197523, exp: 1718201123, sub: '1' }
  res.locals.decodedJwtPayload = decodedJwtPayload;

  return next();
}
