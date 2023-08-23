import "reflect-metadata";

import { Request, Response } from "express";
import { UserCreate } from "../../../../business/core/user-create";
import { IUser } from "../../../../business/entities/User";
import { UserRepositoryAdapter } from "../../../out/type-orm/postgres-adapter/user-repository-adapter";
import { AppError } from "../utils/get-error";

export default class CreateUserController {
  static async createUser(req: Request, res: Response): Promise<Response> {
    const userRepositoryAdapter = new UserRepositoryAdapter();

    try {
      const userData: IUser = req.body;


      const createUser = new UserCreate(userRepositoryAdapter);
      await createUser.execute(userData);

      return res.status(201).send();
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error("An unexpected error occurred:", error);
      return res.status(400).json({ error: error });
    }
  }
}
