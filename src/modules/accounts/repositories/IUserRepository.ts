import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
  findById(id: string): Promise<User>;
  /* Posso desestruturar os dados ou somente pegar como
  esta aqui em baixo data: do tipo da interface */
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  save(user_id: string, user: User): Promise<void>;
}

export { IUserRepository };
