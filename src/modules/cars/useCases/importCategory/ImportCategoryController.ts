import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  // eslint-disable-next-line prettier/prettier
  constructor(private importCtegoryUseCase: ImportCategoryUseCase) { }

  handle(req: Request, res: Response): Response {
    const { file } = req;
    this.importCtegoryUseCase.execute(file);
    return res.send();
  }
}

export { ImportCategoryController };
