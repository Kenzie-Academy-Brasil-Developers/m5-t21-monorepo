export class ApiError extends Error {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

// export class ApiError extends Error {
//   constructor(public message: string, public statusCode: number) {
//     super(message);
//   }
// }
