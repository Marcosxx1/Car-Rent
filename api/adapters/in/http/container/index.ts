import { container } from "tsyringe";
import { UserPort } from "../../../../business/ports/user-port";
import { UserRepositoryAdapter } from "../../../out/type-orm/postgres-adapter/user-repository-adapter";


container.registerSingleton<UserPort>("UserRepositoryAdapter", UserRepositoryAdapter);
