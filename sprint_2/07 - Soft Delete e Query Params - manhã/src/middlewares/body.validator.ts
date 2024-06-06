import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
    }

    return next();
  };
}

// Como era feito no M4
// Currying (uma função que retorna outra função)
// export class Validator {
//   static execute(schema: ZodSchema) {
//     return (req: Request, res: Response, next: NextFunction) => {
//       try {
//         req.body = schema.parse(req.body);
//       } catch (error) {
//         if (error instanceof ZodError) {
//           return res.status(400).json({ error: error.errors });
//         }
//       }
//      next();
//     };
//   }
// }
