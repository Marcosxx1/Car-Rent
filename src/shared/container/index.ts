import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repository/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repository/implementations/CategoriesRepository";

/* ICategoriesRepository */
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);
