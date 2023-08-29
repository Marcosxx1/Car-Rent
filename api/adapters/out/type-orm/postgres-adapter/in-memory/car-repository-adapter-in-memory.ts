import { Car, ICar } from "../../../../../business/entities/Car";
import { CarPort } from "../../../../../business/ports/car-ports";


export class CarRepositoryInMemoryAdapter implements CarPort {

  cars: ICar[] = [];

  async create(data: ICar): Promise<ICar> {
    const carData: ICar = {
      ...data,
      available: data.available ?? true,
      created_at: new Date(),
    };

    this.cars.push(carData);
    return carData;
  }
  async update(id: string, data: ICar): Promise<ICar> {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars[carIndex] = data;
    return data;
  }
  async delete(id: string): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars.splice(carIndex, 1);
    return;
  }
  async list(): Promise<ICar[]> {
    return this.cars;
  }
  async findByLicensePlate(license_plate: string): Promise<ICar> {
    return this.cars.find(car => car.license_plate === license_plate);
  }
  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<ICar[]> {
    const cars = this.cars.filter(car => car.available === true);
    return cars;
  }
  async findById(id: string): Promise<ICar> {
    const car = this.cars.find(car => car.id === id);
    return car;
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    const car = this.cars.find(car => car.id === id);
    car.available = available;
    return;
  }

}