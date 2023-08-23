import { IUser } from "../entities/User";


export interface UserPort {
  create(data: IUser): Promise<void>;
  findById(id: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  save(user_id: string, user: IUser): Promise<void>;
}

