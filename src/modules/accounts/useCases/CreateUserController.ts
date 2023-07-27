import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUserCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, email, driver_license, password } = req.body;

    const createUserUserCase = container.resolve(CreateUserUserCase);

    await createUserUserCase.execute({
      name,
      username,
      email,
      driver_license,
      password,
    });
    return res.status(201).send();
  }
}

export { CreateUserController };
