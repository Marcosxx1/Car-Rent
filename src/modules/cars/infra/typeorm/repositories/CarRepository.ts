import { Repository } from "typeorm";
import { ICarRepository } from "../../../repository/ICarRepository";
import { Car } from "../entities/Car";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICarDTO } from "../../../dtos/ICarDTO";


class CarRepository implements ICarRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = AppDataSource.getRepository(Car);

  }

  async create(data: ICarDTO): Promise<void> {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return Promise.resolve();

  }
  async update(id: string, data: ICarDTO): Promise<void> {
    const car = this.repository.findOneBy({ id });
    const updatedCar = this.repository.merge(await car, data);
    await this.repository.save(updatedCar);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async list(): Promise<Car[]> {
    const cars = await this.repository.find();
    return cars;
  }


  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return Promise.resolve(car);
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const query = this.repository.createQueryBuilder("car")
      .where("car.available = :available", { available: true })
      .andWhere("car.brand = :brand", { brand })
      .andWhere("car.category_id = :category_id", { category_id })
      .andWhere("car.name = :name", { name });

    const cars = await query.getMany();
    return cars;
  }


  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOneOrFail({ where: { id } });
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.update({ id }, { available: !available });
  }
}

export { CarRepository }
