import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecifiationUseCase";

class CreateSpecificationController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createSpecificationUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationController };
