import { Router, Request, Response } from "express";

import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const specificationRoutes = Router();

specificationRoutes.post("/", (req, res) => {
  createSpecificationController.handle(req, res);
});

specificationRoutes.get("/", (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

export { specificationRoutes };
