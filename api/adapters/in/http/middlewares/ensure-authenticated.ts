import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../utils/get-error";
import { UserRepositoryAdapter } from "../../../out/type-orm/postgres-adapter/user-repository-adapter";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token's missing", 401);
  }
  /* [0] = Bearer - índice 0, primeiro elemento
     [1] = token  - indíce 1, segundo elemento
              [, ] ignora o índice 0 e pega só o primeiro elemento
              [ ,] ignora o índice 1 e pega só o segundo elemento */
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "9b1e3364a21359c66c7ea29e08735098") as IPayload;

    const userRepositoryAdapter = new UserRepositoryAdapter();
    const user = userRepositoryAdapter.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 404)
    }

    req.user = {
      id: user_id
    }

    next();
  } catch (error) {
    throw new AppError("Invalid token.", 401);
  }
}

/*  
  Conteúdo do verify(token, "MD5")
  {
   iat: DATA_CRIAÇÃO,
   exp: DATA_EXPIRAÇÃO,
   sub: 'ID_USUARIO'
  } 

*/
