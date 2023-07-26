import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repository/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repository/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repository/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repository/ISpecificationRepository";

/* ICategoriesRepository */
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository,
);
