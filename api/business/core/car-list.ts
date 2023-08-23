import { ICar } from "../entities/Car";
import { CarPort } from "../ports/car-ports";


export class ListCar {
  private carAdapter: CarPort;

  constructor(carAdapter: CarPort) {
    this.carAdapter = carAdapter;
  }

  async execute(): Promise<ICar[]> {
    const cars_found = await this.carAdapter.list();

    if (!cars_found) {
      throw ("Car list is empty!");
    }
    return cars_found;
  }
}