import { NextFunction, Request, Response } from "express";
import { ApiError } from "./api.errors";
import { BodyValidationError } from "../validators";

export function handleGlobalErrors(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ details: error.message });
  }

  if (error instanceof BodyValidationError) {
    return res.status(error.statusCode).json({
      details: error.errors.map(({ path, message }) => {
        return {
          field: path,
          message,
        };
      }),
    });
  }

  console.log(error.message);
  return res.status(500).json({ details: "Internal Server Error" });
}
