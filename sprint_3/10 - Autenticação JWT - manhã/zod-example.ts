import { z } from "zod";

const userCreateSchema = z.object({
  username: z.string().max(255),
  email: z.string().email().max(255),
  password: z.string(),
});

type UserCreate = z.infer<typeof userCreateSchema>;

let body: any = {
  id: 1,
  username: "chrystian",
  email: "chrystian@mail.com",
  password: "1234",
  chaveExtra: "valorExtra",
};

body = userCreateSchema.parse(body);

function userCreateService(payload: UserCreate) {
  return payload;
}

console.log(userCreateService(body));
