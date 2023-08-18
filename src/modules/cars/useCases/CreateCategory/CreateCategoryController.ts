import "reflect-metadata";

import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoriesUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoriesUseCase.execute({ name, description });

    return res.status(201).send();
  }
}
export { CreateCategoryController };
