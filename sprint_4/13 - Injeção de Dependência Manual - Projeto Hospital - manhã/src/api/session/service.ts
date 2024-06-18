import { prisma } from "../../../prisma/prisma.client";
import { generateToken } from "../../configs";
import { ApiError } from "../@shared/errors";
import { SessionLogin } from "./interfaces";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class SessionService {
  public login = async (payload: SessionLogin) => {
    // 1. Verificar se o email corresponde a um usuario no DB
    const account = await prisma.account.findUnique({
      where: { email: payload.email },
    });

    // 401 - UNAUTHORIZED
    if (!account) {
      throw new ApiError("Invalid credentials", 401);
    }

    // 2. Verificar se a senha corresponde a senha do email encontrado
    const passwordMatch = await bcrypt.compare(
      payload.password,
      account.password
    );

    if (!passwordMatch) {
      throw new ApiError("Invalid credentials", 401);
    }

    // 3. Gerar um token JWT para retornar para o usuario
    // const secret = process.env.JWT_TOKEN!;
    const token = generateToken({ fullName: account.fullName }, account.id);

    return token;
  };
}
