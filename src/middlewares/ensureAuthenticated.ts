import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;


  if (!authHeader) {
    throw new Error("Token's missing");
  }
  /*[0] = Bearer - índice 0, primeiro elemento
    [1] = token  - indíce 1, segundo elemento
              [, ] ignora o índice 0 e pega só o primeiro elemento
              [ ,] ignora o índice 1 e pega só o segundo elemento*/
  const [, token] = authHeader.split(" ");


  try {
    const { sub } = verify(token, "9b1e3364a21359c66c7ea29e08735098")
    console.log(sub);

    next();

  } catch (error) {
    throw new Error("Invalid token.")
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