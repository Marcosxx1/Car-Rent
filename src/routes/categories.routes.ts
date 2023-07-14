import { Router, Request, Response } from "express";

import { CategoriesRepository } from "../modules/cars/repository/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/CreateCategory";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req: Request, res: Response) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req: Request, res: Response) => {
  const all = categoriesRepository.list();
  return res.json(all);
});

export { categoriesRoutes };
