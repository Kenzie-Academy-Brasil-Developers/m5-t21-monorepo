import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

// CURRYING -> (JS)
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // req.body = schema.parse(req.body);
    try {
      req.body = schema.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }

      return res.status(500).json({ error: "internal server error" });
    }

    next();
  };
}

// Forma feita no M4
// export class Validator {
//   static execute(schema: ZodSchema) {
//     return (req: Request, res: Response, next: NextFunction) => {
//       try {
//         req.body = schema.parse(req.body);
//       } catch (error) {
//         if (error instanceof ZodError) {
//           return res.status(400).json({ error: error.errors });
//         }

//         return res.status(500).json({ error: "internal server error" });
//       }
//     };
//   }
// }
