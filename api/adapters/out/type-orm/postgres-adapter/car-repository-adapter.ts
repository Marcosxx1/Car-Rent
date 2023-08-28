import { Repository } from "typeorm";
import { ICar } from "../../../../business/entities/Car";
import { CarPort } from "../../../../business/ports/car-ports";
import { CarModel } from "./models/car-model";
import { AppDataSource } from "..";

export class CarRepositoryAdapter implements CarPort {
  private repository: Repository<CarModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarModel);
  }
  async create(data: ICar): Promise<ICar> {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return Promise.resolve(car);
  }

  async update(id: string, data: ICar): Promise<ICar> {
    const car = await this.repository.findOneBy({ id });
    const updatedCar = this.repository.merge(car, data);
    await this.repository.save(updatedCar);
    return Promise.resolve(updatedCar);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async list(page: number = 1, limit: number = 10): Promise<ICar[]> {
    const cars = await this.repository
      .createQueryBuilder("car")
      .leftJoinAndSelect("car.category_id", "category")
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<ICar> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return Promise.resolve(car);
  }
  async findAvailable(
    brand?: string | undefined,
    category_id?: string | undefined,
    name?: string | undefined):
    Promise<ICar[]> {
    const query = this.repository.createQueryBuilder("car")
      .where("car.available = :available", { available: true })
      .andWhere("car.brand = :brand", { brand })
      .andWhere("car.category_id = :category_id", { category_id })
      .andWhere("car.name = :name", { name });

    const cars = await query.getMany();
    return cars;
  }

  async findById(id: string): Promise<ICar> {
    const car = await this.repository.findOneOrFail({ where: { id } });
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.update({ id }, { available: !available });
  }
}