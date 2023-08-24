import { Request, Response } from "express";
import { UserRepositoryAdapter } from "../../../out/type-orm/postgres-adapter/user-repository-adapter";
import { AuthenticateUser } from "../../../../business/core/authenticate-user";
import { AppError } from "../utils/get-error";

export class LoginController {

  static async login(req: Request, res: Response): Promise<Response> {
    const userRepositoryAdapter = new UserRepositoryAdapter();
    const authenticatedUser = new AuthenticateUser(userRepositoryAdapter);

    try {
      const { email, password } = req.body;
      const token = await authenticatedUser.execute({ email, password });
      return res.status(200).json({ token });
    }

    catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: error });
    }
  }
}