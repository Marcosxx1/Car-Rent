import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUserRepository {
  /* Posso desestruturar os dados ou somente pegar como
  esta aqui em baixo data: do tipo da interface */
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUserRepository };
