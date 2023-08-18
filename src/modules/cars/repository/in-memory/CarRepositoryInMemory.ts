import { ICarDTO } from "../../dtos/ICarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarRepository } from "../ICarRepository";

class CarRepositoryInMemory implements ICarRepository {

  cars: Car[] = [];

  async create(data: ICarDTO): Promise<void> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);
  }

  async update(id: string, data: ICarDTO): Promise<void> {
    const car = this.cars.find(car => car.id === id);
    if (car) {
      Object.assign(car, data);
    } else {
      throw new Error("Car not found");
    }
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const car = this.cars.find(car => car.id === id);
    if (car) {
      this.cars.splice(this.cars.indexOf(car), 1);
    } else {
      throw new Error("Car not found");
    }
    return Promise.resolve();
  }
  list(): Promise<Car[]> {
    throw new Error("Method not implemented.");
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate);
    return Promise.resolve(car);
  }
  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const car = this.cars.filter(car => {
      if (car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)) {
        return car;
      }
      return null;
    })
    return Promise.resolve(car);
  }
  async findById(id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === id)
    return Promise.resolve(car);
  }
  updateAvailable(id: string, available: boolean): Promise<void> {
    const car = this.cars.find(car => car.id === id);
    car.available = available;
    return Promise.resolve();

  }

}

export { CarRepositoryInMemory };