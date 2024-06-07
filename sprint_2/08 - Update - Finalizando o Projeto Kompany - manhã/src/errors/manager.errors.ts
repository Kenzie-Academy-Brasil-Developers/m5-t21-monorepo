import { ApiError } from "./api.errors";

export class DuplicatedEmailError extends ApiError {
  constructor(
    public readonly message: string = "Email already used",
    public readonly statusCode: number = 409
  ) {
    super(message, statusCode);
  }
}
