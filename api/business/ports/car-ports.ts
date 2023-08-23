import { ICar } from "../entities/Car";


export interface CarPort {
  create(data: ICar): Promise<ICar>;
  update(id: string, data: ICar): Promise<ICar>;
  delete(id: string): Promise<void>;
  list(): Promise<ICar[]>;

  findByLicensePlate(license_plate: string): Promise<ICar>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<ICar[]>;
  findById(id: string): Promise<ICar>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

