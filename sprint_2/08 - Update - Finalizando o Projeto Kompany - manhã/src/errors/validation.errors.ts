import { ZodError, ZodIssue } from "zod";
import { ApiError } from "./api.errors";

export class BodyValidationError extends ZodError {
  constructor(
    public error: ZodError,
    public readonly statusCode: number = 400
  ) {
    super(error.errors);
  }
}
