import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoriesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listCategoryUseCase: ListCategoryUseCase) { }
  handle(req: Request, res: Response): Response {
    const all = this.listCategoryUseCase.execute();
    return res.json(all);
  }
}

export { ListCategoriesController };
