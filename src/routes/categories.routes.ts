import { Router, Request, Response } from "express";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) =>
  createCategoryController.handle(req, res),
);

// eslint-disable-next-line prettier/prettier
categoriesRoutes.get("/", (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
