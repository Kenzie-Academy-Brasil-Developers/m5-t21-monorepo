import { z } from "zod";

/*
  111.222.333-55
  11122233355
  Algoritmo de verificação de CPF válido:
  https://www.macoratti.net/alg_cpf.htm
*/

export const memberSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  cpf: z.string(),
  phoneNumber: z.string(),
  registrationDate: z.date(),
});

export const memberCreateSchema = memberSchema.omit({
  id: true,
  registrationDate: true,
});
