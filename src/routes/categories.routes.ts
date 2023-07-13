import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { Category } from "./Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = new Category();

  Object.assign(category, {
    name,
    description,
    created_at: new Date(),
  });

  categories.push(category);

  return res.status(201).json(category);
});

export { categoriesRoutes };
