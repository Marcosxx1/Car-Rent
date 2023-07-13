import { Router, Request, Response } from "express";

import { CategoriesRepository } from "../repository/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: "Category already exists!" });
  }

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get("/", (req: Request, res: Response) => {
  const all = categoriesRepository.list();
  return res.json(all);
});

export { categoriesRoutes };
