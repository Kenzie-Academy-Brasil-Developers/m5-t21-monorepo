import { z } from "zod";
import { accountSchema } from "../account/schemas";

export const sessionLoginSchema = accountSchema.pick({
  email: true,
  password: true,
});

// export const sessionLoginSchema = z.object({
//   email: z.string().email().max(100),
//   password: z.string().max(255),
// });
