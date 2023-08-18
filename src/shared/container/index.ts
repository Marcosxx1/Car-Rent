import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { ICategoriesRepository } from "../../modules/cars/repository/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
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

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
