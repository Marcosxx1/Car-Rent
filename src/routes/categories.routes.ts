import { Router, Request, Response } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (req, res) =>
  createCategoryController.handle(req, res),
);

// eslint-disable-next-line prettier/prettier
categoriesRoutes.get("/", (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  const { file } = req;
  console.log(file);
  return res.send();
});

export { categoriesRoutes };
