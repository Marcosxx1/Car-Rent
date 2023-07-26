import { Router, Request, Response } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post("/", createSpecificationController.handle);

specificationRoutes.get("/", (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

export { specificationRoutes };
