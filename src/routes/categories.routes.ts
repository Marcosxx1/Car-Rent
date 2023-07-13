import { Router, Request, Response } from "express";

import { CategoriesRepository } from "../repository/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get("/", (req: Request, res: Response) => {
  const all = categoriesRepository.list();
  return res.json(all);
});

export { categoriesRoutes };
