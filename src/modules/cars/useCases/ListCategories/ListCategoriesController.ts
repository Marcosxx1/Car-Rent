import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoriesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listCategoryUseCase: ListCategoryUseCase) { }
  async handle(req: Request, res: Response): Promise<Response> {
    const all = await this.listCategoryUseCase.execute();
    return res.json(all);
  }
}

export { ListCategoriesController };
