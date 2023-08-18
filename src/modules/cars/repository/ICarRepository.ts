import { ICarDTO } from "../dtos/ICarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface ICarRepository {
  create(data: ICarDTO): Promise<void>;
  update(id: string, data: ICarDTO): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<Car[]>;

  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarRepository }